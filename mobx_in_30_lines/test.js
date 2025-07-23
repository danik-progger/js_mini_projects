import { observable, autorun } from "./main.js";

const title = observable('Mobx article')
const views = observable(10)

const dispose = autorun(() => {
  console.log(`Article: "${title.get()}". Views: ${views.get()}`)
})

views.set(11)
title.set('Lets write Mobx under 50 LOC')

dispose()

views.set(12)