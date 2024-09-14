import { ISection, ISurveyCategory } from "./survey";

export interface ITemplate {
  id: string;
  title: string;
  description: string;
  survey_data: {
    title: string;
    description: string;
    category: ISurveyCategory;
    sections: ISection[];
    tags: string[];
  };
}
