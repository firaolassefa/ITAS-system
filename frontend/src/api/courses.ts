const mockCourses = [
  {
    id: 1,
    title: 'VAT Fundamentals for Beginners',
    description: 'Learn basic VAT concepts, registration, and filing procedures.',
    category: 'VAT',
    difficulty: 'BEGINNER' as const,
    durationHours: 4,
    modules: [
      'Introduction to VAT',
      'VAT Registration Process',
      'Filing VAT Returns',
      'Common VAT Mistakes'
    ],
    published: true,
  },
  {
    id: 2,
    title: 'Income Tax Calculation',
    description: 'Complete guide to calculating and filing income tax returns.',
    category: 'INCOME_TAX',
    difficulty: 'INTERMEDIATE' as const,
    durationHours: 6,
    modules: [
      'Understanding Tax Brackets',
      'Deductions and Allowances',
      'Filing Online Returns'
    ],
    published: true,
  },
  {
    id: 3,
    title: 'Corporate Tax Compliance',
    description: 'Advanced corporate tax obligations and compliance requirements.',
    category: 'CORPORATE_TAX',
    difficulty: 'ADVANCED' as const,
    durationHours: 8,
    modules: [
      'Corporate Tax Structures',
      'Tax Planning Strategies',
      'Compliance Reporting'
    ],
    published: true,
  },
];

const mockEnrollments: any[] = [];

export const coursesAPI = {
  getAllCourses: async () => {
    return Promise.resolve({ data: mockCourses });
  },

  getCourseById: async (id: number) => {
    const course = mockCourses.find(c => c.id === id);
    return Promise.resolve({ data: course });
  },

  enroll: async (userId: number, courseId: number) => {
    mockEnrollments.push({
      id: Date.now(),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      status: 'ENROLLED',
    });
    return Promise.resolve({
      message: 'Successfully enrolled in course',
      data: { enrollmentId: Date.now() },
    });
  },

  updateProgress: async (enrollmentId: number, progress: number) => {
    const enrollment = mockEnrollments.find(e => e.id === enrollmentId);
    if (enrollment) {
      enrollment.progress = progress;
      if (progress >= 100) {
        enrollment.status = 'COMPLETED';
        enrollment.completedAt = new Date().toISOString();
      }
    }
    return Promise.resolve({ message: 'Progress updated' });
  },

  getUserEnrollments: async (userId: number) => {
    const userEnrollments = mockEnrollments
      .filter(e => e.userId === userId)
      .map(e => ({
        ...e,
        course: mockCourses.find(c => c.id === e.courseId),
      }));
    return Promise.resolve({ data: userEnrollments });
  },
};
