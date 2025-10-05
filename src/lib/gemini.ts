export interface GeneratedQuestion {
  question_statement: string;
  options: string[] | null;
  answer: string;
  solution: string;
  question_type: string;
}

export interface QuestionContext {
  examName: string;
  courseName: string;
  subjectName: string;
  topicName: string;
}

export async function generateQuestion(
  questionType: string,
  topicId: string,
  existingQuestions: string[],
  alreadyGenerated: string[],
  context: QuestionContext
): Promise<GeneratedQuestion> {
  const prompt = `Generate a unique ${questionType} question for the topic "${context.topicName}" in the subject "${context.subjectName}" for the exam "${context.examName}".

Context:
- Exam: ${context.examName}
- Course: ${context.courseName}
- Subject: ${context.subjectName}
- Topic: ${context.topicName}
- Question Type: ${questionType}

Requirements:
1. The question must be different from existing questions
2. For MCQ: provide 4 options
3. For MSQ: provide 4 options and indicate multiple correct answers
4. For NAT: provide a numerical answer
5. For SUB: provide a descriptive question
6. Include a detailed solution

Return a JSON object with: question_statement, options (array or null), answer, solution`;

  const response = {
    question_statement: `Sample ${questionType} question for ${context.topicName}`,
    options: questionType === 'MCQ' || questionType === 'MSQ'
      ? ['Option A', 'Option B', 'Option C', 'Option D']
      : null,
    answer: questionType === 'MCQ' ? 'A' : questionType === 'MSQ' ? 'A, B' : '42',
    solution: `This is a sample solution for the ${questionType} question on ${context.topicName}.`,
    question_type: questionType
  };

  return response;
}

export async function generatePYQSolution(
  questionStatement: string,
  questionType: string,
  options: string[] | null,
  context: QuestionContext,
  topicNotes?: string,
  existingPYQs?: string[]
): Promise<{ answer: string; solution: string }> {
  const prompt = `Provide the correct answer and detailed solution for this ${questionType} question:

Question: ${questionStatement}
${options ? `Options: ${options.join(', ')}` : ''}

Context:
- Exam: ${context.examName}
- Subject: ${context.subjectName}
- Topic: ${context.topicName}
${topicNotes ? `\nTopic Notes:\n${topicNotes}` : ''}

Provide a JSON object with: answer, solution`;

  const response = {
    answer: questionType === 'MCQ' ? 'A' : questionType === 'MSQ' ? 'A, B' : '42',
    solution: `This is a sample solution for the PYQ question.`
  };

  return response;
}
