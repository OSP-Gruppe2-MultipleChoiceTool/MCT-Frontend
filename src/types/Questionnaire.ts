export interface QuestionnaireLink {
  id: string;
  expirationDate: string;
}

export interface UpdateQuestionnaireLink {
  expirationDate?: string;
}

export interface Questionnaire {
  id: string;
  title?: string;
  links: QuestionnaireLink[];
  statementSets: StatementSet[];
}

export interface CreateQuestionnaire {
  title?: string;
}

export interface StatementSet {
  explanation?: string;
  statementImage?: string;
  statementTypeId: string;
}

export interface CreateStatementSet {
  explanation?: string;
  statementImage?: string;
  statementTypeId?: string;
}

export interface Statement {
  id: string;
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

export interface UpdateStatementType {
  title?: string;
}
