import type { StatementSet } from "@/types/Questionnaire";

export const isAnswerCorrect = (statementSet: StatementSet, answer: string): boolean => {
  const userCorrectStatementNumbers = answer.split(",")
    .map(number => number.trim())
    .filter(number => number !== "");

  const systemCorrectStatementNumbers = statementSet.statements
    .map((statement, index) => statement.isCorrect ? (index + 1).toString() : "")
    .filter(number => number !== "");

  return isArrayEqualIgnoreOrder(userCorrectStatementNumbers, systemCorrectStatementNumbers);
}

const isArrayEqualIgnoreOrder = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.every((value, index) => value === sortedB[index]);
}
