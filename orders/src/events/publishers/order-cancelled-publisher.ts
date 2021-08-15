import { Publisher, OrderCancelledEvent, Subjects } from "@julitickets/common"

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
