const mockCertificates: any[] = [
  {
    id: 1,
    certificateId: 'ITAS-CERT-2024-001',
    userId: 1,
    courseId: 1,
    issuedAt: '2024-01-20T10:30:00Z',
    validUntil: '2025-01-20T10:30:00Z',
    downloadUrl: '/certificates/ITAS-CERT-2024-001.pdf',
    verified: true,
  }
];

export const certificatesAPI = {
  getUserCertificates: async (userId: number) => {
    const userCerts = mockCertificates.filter(c => c.userId === userId);
    return Promise.resolve({ data: userCerts });
  },

  generateCertificate: async (userId: number, courseId: number) => {
    const newCertificate = {
      id: Date.now(),
      certificateId: `ITAS-CERT-${Date.now()}`,
      userId,
      courseId,
      issuedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      downloadUrl: `/certificates/ITAS-CERT-${Date.now()}.pdf`,
      verified: true,
    };
    mockCertificates.push(newCertificate);
    return Promise.resolve({
      message: 'Certificate generated successfully',
      data: newCertificate,
    });
  },

  verifyCertificate: async (certificateId: string) => {
    const cert = mockCertificates.find(c => c.certificateId === certificateId);
    return Promise.resolve({
      data: {
        valid: !!cert,
        certificate: cert,
      },
    });
  },
};
