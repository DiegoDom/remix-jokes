import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function seed() {
  const john = await db.user.create({
    data: {
      username: 'john',
      // this is a hashed version of "qwerty"
      passwordHash:
        '$2a$10$DPeBPdgVLjtXk9/vZ6eMyOCwWiNeEzj3d5UHMckcUUg/7X9Md50ve',
    },
  })

  await Promise.all(
    getJokes().map((joke) => {
      const data = { jokesterId: john.id, ...joke }
      return db.joke.create({ data })
    }),
  )
}

seed()

function getJokes() {
  //* shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: 'Road worker',
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      name: 'Frisbee',
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      name: 'Trees',
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      name: 'Skeletons',
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      name: 'Hippos',
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      name: 'Dinner',
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      name: 'Elevator',
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ]
}
