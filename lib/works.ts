export interface Work {
  title: string;
  desc: string;
  img: string;
  url: string;
  tags: string[];
}

export const works: Work[] = [
  {
    title: 'Project One',
    desc: 'A modern web application built with Next.js and Tailwind CSS',
    img: 'images/photoseed/project1/800/600',
    url: '#',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript']
  },
  {
    title: 'Project Two',
    desc: 'A responsive e-commerce website with a beautiful UI',
    img: 'images/photoseed/project2/800/600',
    url: '#',
    tags: ['React', 'Styled Components', 'Node.js']
  },
  {
    title: 'Project Three',
    desc: 'A mobile-first design system with comprehensive documentation',
    img: 'images/photoseed/project3/800/600',
    url: '#',
    tags: ['Design System', 'Figma', 'React']
  },
  {
    title: 'Project Four',
    desc: 'A real-time chat application with WebSocket support',
    img: 'images/photoseed/project4/800/600',
    url: '#',
    tags: ['Socket.io', 'Express', 'React']
  },
  {
    title: 'Project Five',
    desc: 'A data visualization dashboard with interactive charts',
    img: 'images/photoseed/project5/800/600',
    url: '#',
    tags: ['D3.js', 'React', 'Data Visualization']
  },
  {
    title: 'Project Six',
    desc: 'A static blog with MDX support and dark mode',
    img: 'images/photoseed/project6/800/600',
    url: '#',
    tags: ['MDX', 'Next.js', 'Dark Mode']
  }
];