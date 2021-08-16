import { Message } from "node-nats-streaming"
import { Subjects, Listener, TicketCreatedEvent } from "@julitickets/common"
import { Ticket } from "../../models/ticket"
import { queueGroupName } from "./queue-group-name"

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  // queue group name is unique for all services instances to prevent
  // sending the same event more than once (could end up in duplicated data as
  // two instances could process the same event independetly)
  queueGroupName = queueGroupName

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data

    const ticket = Ticket.build({
      id,
      title,
      price,
    })
    await ticket.save()

    msg.ack()
  }
}
