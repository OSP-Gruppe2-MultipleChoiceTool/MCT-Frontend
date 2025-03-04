export interface QuestionnaireLink {
  id: string;
  expirationDate: string;
}

export interface UpdateQuestionnaireLink {
  expirationDate?: string;
}

export interface UserAccess {
  linkId: string;
  isExam: boolean;
}

export interface Questionnaire {
  id: string;
  title?: string;
  links: QuestionnaireLink[];
  statementSets: StatementSet[];
}

export interface QuestionnaireResponse {
  id: string;
  title?: string;
  links: QuestionnaireLink[];
  statementSets: StatementSetResponse[];
}

export interface CreateQuestionnaire {
  title?: string;
}

export interface StatementSet {
  explaination?: string;
  statementImage?: string;
  statementTypeId?: string;
  statements: Statement[];
}

export type UpdateStatementSet = {
  explaination?: string;
  statementImage?: string;
  statementTypeId?: string;
  statements: UpdateStatement[];
}

export type StatementSetResponse = {
  id: string;
  explaination?: string;
  statementImage?: string;
  statementType?: StatementType;
  statements: Statement[];
};

export interface Statement {
  id: string;
  isCorrect: boolean;
  statement: string;
}

export interface UpdateStatement {
  isCorrect: boolean;
  statement: string;
}

export interface StatementType {
  id: string;
  title: string;
}

export interface CreateStatementType {
  title: string;
}
