/**
 * URLs based on Swagger API
 */
export abstract class ApiEndpoints {
    public static readonly QUESTIONAIRES = '/api/questionaires';  // Liste aller Fragebögen
    public static readonly QUESTIONAIRE_BY_ID = '/api/questionaires/{questionaireId}';
    public static readonly QUESTIONAIRE_EXPORT = '/api/questionaires/{questionaireId}/export';
    public static readonly QUESTIONAIRE_LINKS = '/api/questionaires/{questionaireId}/links';
    public static readonly QUESTIONAIRE_LINK_BY_ID = '/api/questionaires/{questionaireId}/links/{linkId}';
    public static readonly STATEMENT_SETS = '/api/questionaires/{questionaireId}/statement-sets';
    public static readonly STATEMENT_SET_BY_ID = '/api/questionaires/{questionaireId}/statement-sets/{statementSetId}';
    public static readonly STATEMENTS = '/api/questionaires/{questionaireId}/statement-sets/{statementSetId}/statements';
    public static readonly STATEMENT_BY_ID = '/api/questionaires/{questionaireId}/statement-sets/{statementSetId}/statements/{statementId}';
    public static readonly STATEMENT_TYPES = '/api/statement-types';
    public static readonly STATEMENT_TYPE_BY_ID = '/api/statement-types/{statementTypeId}';
    public static readonly USER_ACCESS = '/api/statements';
}