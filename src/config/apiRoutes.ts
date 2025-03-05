export const apiRoutes = {
  questionaires: '/api/questionaires',
  questionaireByTypeId: '/api/questionaires?statementTypeId={statementTypeId}',
  questionaireById: '/api/questionaires/{questionaireId}',
  questionaireExport: '/api/questionaires/{questionaireId}/export',
  questionaireLinks: '/api/questionaires/{questionaireId}/links',
  questionaireLinkById: '/api/questionaires/{questionaireId}/links/{linkId}',
  statementSets: '/api/questionaires/{questionaireId}/statement-sets',
  statementSetById: '/api/questionaires/{questionaireId}/statement-sets/{statementSetId}',
  statementTypes: '/api/statement-types',
  statementTypeById: '/api/statement-types/{statementTypeId}',
  userAccess: '/api/statements',
};

export const buildApiUrl = (route: string, params: Record<string, string | number>): string => {
  let url = route;

  for (const key in params) {
    url = url.replace(`{${key}}`, String(params[key]));
  }

  return url;
}
