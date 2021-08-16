import mongoose from "mongoose"
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@julitickets/common"
import express, { Request, Response } from "express"
import { body } from "express-validator"
import { Ticket } from "../models/ticket"
import { Order } from "../models/order"
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher"
import { natsWrapper } from "../nats-wrapper"

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 1 * 60

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body
    console.log({ ticketId })
    // find ticket user is trying to order
    const ticket = await Ticket.findById(ticketId)
    const tickets = await Ticket.find({})
    console.log(tickets)
    if (!ticket) throw new NotFoundError()

    // make sure ticket is not reserved
    // run query to look at all orders. find an order where the ticket
    // is the ticket we just found *and* the order status is *not* cancelled.
    // if we find an order from that means the ticket *is* reserved
    const isReserved = await ticket.isReserved()
    if (isReserved) throw new BadRequestError("Ticket is already reserved")

    // calculate expiration date
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

    // build order and save to db
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    })
    await order.save()

    // publish event saying order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    })

    res.status(201).send(order)
  }
)

export { router as newOrderRouter }
