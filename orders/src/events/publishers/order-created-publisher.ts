import { Subjects, Publisher, OrderCreatedEvent } from "@julitickets/common"

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}
