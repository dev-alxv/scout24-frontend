import { ApiIntentResponseType } from "src/app/domain/enums/api/api-response-type.enum";
import { IntentResultResponseType } from "src/app/domain/enums/common/intent-result-response.enum";


export function parseApiIntentResponseType(apiResponse: ApiIntentResponseType): IntentResultResponseType {

  let response: IntentResultResponseType = 'Intent_Data_Missing';

  switch (apiResponse) {
    case 'PRECONDITIONS_MISSING':
      response = 'Intent_Data_Missing';
      break;

    case 'USER_NOT_FOUND':
      response = 'User_Not_Found';
      break;

    case 'TOUR_NOT_FOUND':
      response = 'Tour_Not_Found';
      break;

    case 'ITEM_NOT_FOUND':
      response = 'Tour_Item_Not_Found';
      break;

    case 'OBJECT_IN_PORTAL_NOT_FOUND':
      response = 'Expose_Not_Found_In_Portal';
      break;

    case 'ITEM_ALREADY_LINKED':
      response = 'Tour_Already_Linked';
      break;

    case 'ITEM_UNLINKING_PENDING':
      response = 'Tour_Unlinking_Pending';
      break;

    case 'ITEM_UNLINKED':
      response = 'Tour_Unlinked';
      break;

    case 'ITEM_DELETED':
      response = 'Tour_Deleted';
      break;

    case 'PORTAL_CREATED':
      response = 'Tour_Linked';
      break;
  }

  return response;
}
