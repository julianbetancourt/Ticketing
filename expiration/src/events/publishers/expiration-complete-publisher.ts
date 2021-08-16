import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@julitickets/common"

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
