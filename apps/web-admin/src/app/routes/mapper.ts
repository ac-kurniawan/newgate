export const sidebarGroupMapper = (group: string) => {
  switch (group) {
    case 'kong':
      return 'API Gateway';
    case 'admin':
      return 'Administration';
    default:
      return 'Others';
  }
};
