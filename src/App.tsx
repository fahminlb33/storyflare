import { useState } from 'react'

import './App.css'

type Page = {
  i: number;
  caption: string;
  image: ArrayBuffer;
}

function App() {
  const [prompt, setPrompt] = useState("")
  const [story, setStory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [storyContents, setStoryContents] = useState<Page[]>([])

  function submit() {
    setIsLoading(true)

    setStory("")
    fetch("/api/create_story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

      .then(res => res.json())
      .then(res => {
        console.log(res)
        // append story
        const fullStory = String((res as any).response);
        setStory(fullStory);

        // parse pages
        const pages = fullStory.split("\n").filter(x=>x.length > 10);
        for (let i = 0; i < pages.length; i++) {
          console.log(pages[i])
          fetch("/api/create_page", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: pages[i] })
          }).then(res => res.arrayBuffer())
            .then(res => {
              setStoryContents(old => [...old, {
                i,
                caption: pages[i],
                image: res
              }])
            })
        }
      })

      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <h1>STORYFLARE</h1>

      <div>
        <input type='text' value={prompt} onChange={e => setPrompt(e.target.value)} disabled={isLoading} />
        <button onClick={submit} disabled={isLoading}>Submit</button>
      </div>

      <div>
        <p>Fulls story: {story}</p>
      </div>

      <div>
        {storyContents.sort((a,b)=>a.i - b.i).map((page, i) => (
          <div key={i}>
            <img src={URL.createObjectURL(new Blob([page.image]))} />
            <p>{page.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
