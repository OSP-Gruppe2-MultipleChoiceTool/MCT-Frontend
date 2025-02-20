export abstract class ApiEndpoints {
    public static readonly QUESTIONNAIRES = '/api/questionnaires';  // Liste aller Fragebögen
    public static readonly QUESTIONNAIRE_BY_ID = '/api/questionnaires/{questionnaireId}';
    public static readonly QUESTIONNAIRE_EXPORT = '/api/questionnaires/{questionnaireId}/export';
    public static readonly QUESTIONNAIRE_LINKS = '/api/questionnaires/{questionnaireId}/links';
    public static readonly QUESTIONNAIRE_LINK_BY_ID = '/api/questionnaires/{questionnaireId}/links/{linkId}';
    public static readonly STATEMENT_SETS = '/api/questionnaires/{questionnaireId}/statement-sets';
    public static readonly STATEMENT_SET_BY_ID = '/api/questionnaires/{questionnaireId}/statement-sets/{statementSetId}';
    public static readonly STATEMENTS = '/api/questionnaires/{questionnaireId}/statement-sets/{statementSetId}/statements';
    public static readonly STATEMENT_BY_ID = '/api/questionnaires/{questionnaireId}/statement-sets/{statementSetId}/statements/{statementId}';
    public static readonly STATEMENT_TYPES = '/api/statement-types';
    public static readonly STATEMENT_TYPE_BY_ID = '/api/statement-types/{statementTypeId}';
    public static readonly USER_ACCESS = '/api/statements';
}