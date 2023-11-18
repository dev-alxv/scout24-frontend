import { LanguageString } from "src/app/domain/enums/locales.enum";

export interface IUserSettings {
  defaultDisplayLanguage?: LanguageString;
  currentDisplayLanguage?: LanguageString;
}
