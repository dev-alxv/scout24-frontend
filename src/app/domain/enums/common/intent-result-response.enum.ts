
export enum IntentResultResponse {
  Intent_Data_Missing = 'INTENT_DATA_MISSING',
  Tour_Item_Not_Found = 'TOUR_ITEM_NOT_FOUND',
  User_Not_Found = 'USER_NOT_FOUND',
  Tour_Not_Found = 'TOUR_NOT_FOUND',
  Expose_Not_Found_In_Portal = 'EXPOSE_NOT_FOUND_IN_PORTAL',
  Tour_Already_Linked = 'TOUR_ALREADY_LINKED',
  Tour_Unlinking_Pending = 'TOUR_UNLINKING_PENDING',
  Tour_Unlinked = 'TOUR_UNLINKED',
  Tour_Linked = 'TOUR_LINKED',
  Tour_Deleted = 'TOUR_DELETED',
  Order_Created = 'ORDER_CREATED'
}

export type IntentResultResponseType = keyof typeof IntentResultResponse;
