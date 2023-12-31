import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

async function exists(args: Prisma.WaitListCountArgs) {
    const count = await prisma.waitList.count(args)
    return Boolean(count)
}

app.post('/api', async (req, res) => {
    // empty user data check
    const { email, phone_number, name, comment } = req.body
    if (!email || !phone_number || !name) {
        return res.status(400).json({ message: 'Email and name are required fields' })
    }
    
    // user existence check
    const waitListExists = await exists({
        where: {
            email,
            phone_number
        }
    })
    if (waitListExists) {
        return res.status(403).json({ message: "User already exists" })
    } else {
        // adding user to the waitlist
        try {
            const createdRow = await prisma.waitList.create({
                data: {
                    email,
                    phone_number,
                    name,
                    comment
                }
            })

            res.send(createdRow)
        } catch (error) {
            res.status(400).send({ message: error })
        }
    }
})

app.get('/api', async (req, res) => {
    res.json(
        {
           "puk": 1
        }
    )
})

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
})
