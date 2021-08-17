import { Subjects, Publisher, PaymentCreatedEvent } from "@julitickets/common"

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}
