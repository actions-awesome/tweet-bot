import { getInput, info, setFailed } from '@actions/core'
import Twitter from 'twitter-v2'
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  TWEET,
} from './constants'

main()

async function main() {
  const access_token_key = getInput(ACCESS_TOKEN_KEY)
  const access_token_secret = getInput(ACCESS_TOKEN_SECRET)
  const consumer_key = getInput(CONSUMER_KEY)
  const consumer_secret = getInput(CONSUMER_SECRET)
  const tweetToSend = getInput(TWEET)
  const twitter = new Twitter({
    access_token_key,
    access_token_secret,
    consumer_key,
    consumer_secret,
  })
  try {
    await twitter.post('tweets', {
      text: tweetToSend,
    })
    info(`Tweet sent successfully with content: ${tweetToSend}`)
  } catch (e) {
    setFailed(e as Error)
  }
}
