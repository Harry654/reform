import { ISection, ISurveyCategory } from "./survey";

export interface ITemplate {
  id: string;
  title: string;
  description: string;
  isFree: boolean;
  survey_data: {
    title: string;
    description: string;
    category: ISurveyCategory;
    sections: ISection[];
    tags: string[];
  };
}
