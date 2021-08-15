import { Publisher, Subjects, TicketCreatedEvent } from "@julitickets/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}
