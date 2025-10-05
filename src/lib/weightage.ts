export interface TopicDistribution {
  topicId: string;
  topicName: string;
  weightage: number;
  questionsToGenerate: number;
}

export function calculateQuestionDistribution(
  topics: Array<{ id: string; name: string; weightage: number }>,
  totalQuestions: number
): TopicDistribution[] {
  const totalWeightage = topics.reduce((sum, topic) => sum + topic.weightage, 0);

  if (totalWeightage === 0) {
    const questionsPerTopic = Math.floor(totalQuestions / topics.length);
    return topics.map(topic => ({
      topicId: topic.id,
      topicName: topic.name,
      weightage: 0,
      questionsToGenerate: questionsPerTopic
    }));
  }

  const distribution: TopicDistribution[] = topics.map(topic => {
    const percentage = (topic.weightage / totalWeightage) * 100;
    const questionsForTopic = Math.round((topic.weightage / totalWeightage) * totalQuestions);

    return {
      topicId: topic.id,
      topicName: topic.name,
      weightage: percentage,
      questionsToGenerate: questionsForTopic
    };
  });

  const totalAllocated = distribution.reduce((sum, d) => sum + d.questionsToGenerate, 0);
  const difference = totalQuestions - totalAllocated;

  if (difference !== 0 && distribution.length > 0) {
    distribution[0].questionsToGenerate += difference;
  }

  return distribution.filter(d => d.questionsToGenerate > 0);
}
