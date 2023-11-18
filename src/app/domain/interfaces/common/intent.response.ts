import { IntentResultResponseType } from '../../enums/common/intent-result-response.enum';
import { StatusResponseType } from '../../enums/common/status-response.enum';

export interface IIntentResponse {
  payload?: any;
  result?: StatusResponseType;
  descriptionMessage?: string;
  intentResultResponse?: IntentResultResponseType;
}
