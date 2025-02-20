export type CreateStatementSet = {
    explaination?: string;
    statementImage?: string;
    statementTypeId?: string;
  };

  export type CreateStatementType = {
    title: string;
  };

  export type UpdateQuestionaireLink = {
    expirationDate?: string; 
  };

  export type UpdateQuestionaire = {
    title?: string; 
  };

  export type UpdateStatement = {
    isCorrect?: boolean;
    statement?: string; 
  };

  export type UpdateStatementSet = {
    explaination?: string;      
    statementImage?: string;    
    statementTypeId?: string;
  };

  export type UpdateStatementType = {
    title?: string;
  };
   
  export type QuestionaireLink = {
    id: string;
    expirationDate: string;  
  };

  export type Questionaire = {
    id: string;
    title: string;
    statementSets: StatementSetResponseDto[];
    links: QuestionaireLink[]; 
  };

  export type Statement = {
    id: string;
    isCorrect: boolean;
    statement: string;
  };

  export type StatementSetResponseDto = {
    id: string;
    explaination?: string;
    statementImage?: string;
    statementType?: StatementType;
    statements: Statement[];
  };

  export type StatementType = {
    id: string;
    title: string;
  };