const projects = [
  {
    name: 'countdown-timer',
    frontendMentorChallenge: false,
    gif: false,
  },
  {
    name: 'password-generator',
    frontendMentorChallenge: false,
    gif: false,
  },
  {
    name: 'markdown-previewer',
    frontendMentorChallenge: false,
    gif: false,
  },
  {
    name: 'article-preview-component',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'intro-component-with-signup-form',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'box-shadow-generator',
    frontendMentorChallenge: false,
    gif: false,
  },
  {
    name: 'keyboard-event-code-detector',
    frontendMentorChallenge: false,
    gif: false,
  },
  {
    name: 'single-price-grid-component',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'ping-coming-soon-page',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'tic-tac-toe',
    frontendMentorChallenge: false,
    gif: true,
  },
  {
    name: 'twitter-profile',
    frontendMentorChallenge: false,
    gif: false,
  },
  {
    name: 'hello-world-animation',
    frontendMentorChallenge: false,
    gif: true,
  },
  {
    name: 'huddle-landing-page-with-alternating-feature-blocks',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'huddle-landing-page-with-single-introductory-section',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'fylo-landing-page-with-two-column-layout',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'social-media-dashboard-with-theme-switcher',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'insure-landing-page',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'pricing-component-with-toggle',
    frontendMentorChallenge: true,
    gif: false,
  },
  {
    name: 'project-tracking-intro-component',
    frontendMentorChallenge: true,
    gif: false,
  },
]

const list = document.getElementById('list')

projects.forEach(({ name, frontendMentorChallenge, gif }, i) => {
  const listItem = document.createElement('li')
  let imgSrc
  let previewUrl
  let githubSrc

  if (frontendMentorChallenge) {
    imgSrc =
      'https://raw.githubusercontent.com/pbteja1998/frontend-mentor-challenges/master/' +
      name +
      '/design/desktop-design.jpg'
    previewUrl = `https://frontend-mentor.bhanuteja.dev/${name}/index.html`
    githubSrc = `https://github.com/pbteja1998/frontend-mentor-challenges/tree/master/${name}`
  } else {
    if (gif) {
      imgSrc = `${name}/${name}.gif`
    } else {
      imgSrc = `${name}/preview/desktop.png`
    }
    previewUrl = `${name}/index.html`
    githubSrc = `https://github.com/pbteja1998/100Days100Projects/tree/master/${name}`
  }

  listItem.innerHTML = `
      <a href="${previewUrl}">
        <img src="${imgSrc}" alt="${name}" />
        <p>${i + 1}. ${formatProjectName(name)}</p>
      </a>
      
      <div class="links-container">
        <a href="${previewUrl}" class="blue" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-eye"></i>
        </a>
        <a href="${githubSrc}" class="blue" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-code"></i>
        </a>
      </div>`
  list.appendChild(listItem)
})

function formatProjectName(name) {
  return name
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
