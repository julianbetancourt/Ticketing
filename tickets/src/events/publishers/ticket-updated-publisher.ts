import { Publisher, Subjects, TicketUpdatedEvent } from "@julitickets/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
