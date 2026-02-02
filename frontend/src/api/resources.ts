const mockResources = [
  {
    id: 1,
    title: 'VAT Compliance Handbook 2024',
    description: 'Complete guide to VAT compliance for small and medium businesses.',
    resourceType: 'PDF' as const,
    fileUrl: '/resources/vat-handbook.pdf',
    category: 'VAT',
    audience: 'ALL' as const,
    views: 1250,
    downloads: 890,
    uploadedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: 'How to File Tax Returns Online',
    description: 'Step-by-step video tutorial for online tax filing.',
    resourceType: 'VIDEO' as const,
    fileUrl: '/resources/tax-filing.mp4',
    category: 'INCOME_TAX',
    audience: 'TAXPAYER' as const,
    views: 3200,
    downloads: 1500,
    uploadedAt: '2024-02-01T14:20:00Z',
  },
  {
    id: 3,
    title: 'Tax Deductions Guide',
    description: 'Comprehensive list of eligible tax deductions and credits.',
    resourceType: 'ARTICLE' as const,
    fileUrl: '/resources/deductions-guide.pdf',
    category: 'INCOME_TAX',
    audience: 'ALL' as const,
    views: 890,
    downloads: 670,
    uploadedAt: '2024-01-20T09:15:00Z',
  },
];

export const resourcesAPI = {
  getAllResources: async () => {
    return Promise.resolve({ data: mockResources });
  },

  searchResources: async (query?: string, category?: string) => {
    let results = mockResources;
    if (query) {
      results = results.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category) {
      results = results.filter(r => r.category === category);
    }
    return Promise.resolve({ data: results });
  },

  downloadResource: async (id: number) => {
    const resource = mockResources.find(r => r.id === id);
    if (resource) {
      resource.downloads++;
      return Promise.resolve({
        message: 'Download started',
        data: { downloadUrl: resource.fileUrl },
      });
    }
    return Promise.reject(new Error('Resource not found'));
  },

  uploadResource: async (resourceData: any) => {
    const newResource = {
      id: Date.now(),
      ...resourceData,
      views: 0,
      downloads: 0,
      uploadedAt: new Date().toISOString(),
    };
    mockResources.push(newResource);
    return Promise.resolve({
      message: 'Resource uploaded successfully',
      data: newResource,
    });
  },
};
