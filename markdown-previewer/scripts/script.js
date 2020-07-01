const iniitalContent =
`# H1
## H2
### H3
#### H4
##### H5
###### H6

--------------

**bold**
*italic*
++underline++

--------------

[link to Google](https://google.com)

--------------

1. Numbered List Item 1
    1. Nested Item 1
    1. Nested Item 2
1. Numbered List Item 2

--------------

- Bulleted List Item 1
   - Nested Item 1
- Bulleted List Item 2
* Bulleted List Item 3
   - Nested Item 2

--------------

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

--------------

:::youtube[https://www.youtube.com/watch?v=0pThnRneDjw]
Web Development In 2020
:::

--------------

> Block Quote

--------------

\`\`\`html
<h1>This is html</h1>
\`\`\`
--------------

\`\`\`css
.container {
    display: flex;
}
\`\`\`

--------------

\`\`\`js
const x = 2;
let y = 3;
for (let i = 0; i < x; i++) y += i;
\`\`\`

--------------

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content from cell 2 | Content from cell 4

--------------  
  
`

window.onload = function () {
  const markdownTextarea = document.getElementById('markdown')
  const resultElement = document.getElementById('result')
  markdownTextarea.value = iniitalContent

  function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : null
  }

  function getYoutubeIframeMarkup ({url}) {
    console.log({ url })
    const videoId = getYoutubeVideoId(url)
    if (!videoId) {
      return ''
    }
    return `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }

  const md = window.markdownit({
    html: false,
    linkify: true,
    breaks: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && window.hljs.getLanguage(lang)) {
        try {
          return window.hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return '';
    }
  })
      .use(window.markdownitIns)
      .use(window.markdownitContainer, 'youtube', {
        validate: function (params) {
          return params.trim().match(/^youtube\s*\[(.*)]$/)
        },
        render: function (tokens, idx) {
          if (tokens[idx].type === 'container_youtube_open') {
            const matches = tokens[idx].info.trim().match(/^youtube\s*\[(.*)]$/)
            if (matches && matches[1]) {
              return (
                  '<div class="text-center video-container">' +
                  getYoutubeIframeMarkup({ url: matches[1].trim() }) +
                  '</div><div class="text-center font-weight-light text-capitalize">'
              )
            }
          } else if (tokens[idx].type === 'container_youtube_close') {
            return '</div>'
          }
        },
      })
  resultElement.innerHTML = md.render(markdownTextarea.value)
  markdownTextarea.addEventListener('keyup', function () {
    resultElement.innerHTML = md.render(markdownTextarea.value)
  })
}
