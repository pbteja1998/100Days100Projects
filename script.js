const projects = [
  {
    name: 'countdown-timer',
    frontendMentorChallenge: false
  },
  {
    name: 'password-generator',
    frontendMentorChallenge: false
  },
  {
    name: 'markdown-previewer',
    frontendMentorChallenge: false
  },
  {
    name: 'article-preview-component',
    frontendMentorChallenge: true
  }
];

const list = document.getElementById('list');

projects.forEach(({ name, frontendMentorChallenge}, i) => {
  const listItem = document.createElement('li')
  let imgSrc
  let previewUrl
  let githubSrc

  if (frontendMentorChallenge) {
    imgSrc = 'https://raw.githubusercontent.com/pbteja1998/frontend-mentor-challenges/master/' +
        name + '/design/desktop-design.jpg'
    previewUrl = `https://frontend-mentor.bhanuteja.dev/${name}/index.html`
    githubSrc = `https://github.com/pbteja1998/frontend-mentor-challenges/tree/master/${name}`
  } else {
    imgSrc = `${name}/preview/desktop.png`
    previewUrl = `${name}/index.html`
    githubSrc = `https://github.com/pbteja1998/100Days100Projects/tree/master/${name}`
  }

  listItem.innerHTML = `
      <a href="${previewUrl}">
        <img src="${imgSrc}" alt="${name}" />
        <p>${i + 1}. ${formatProjectName(name)}</p>
      </a>
      
      <div class="links-container">
        <a href="${previewUrl}" class="blue">
          <i class="fas fa-eye"></i>
        </a>
        <a href="${githubSrc}" class="blue">
          <i class="fas fa-code"></i>
        </a>
      </div>`
  list.appendChild(listItem)
});

function formatProjectName(name) {
  return name
      .split('-')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
}
