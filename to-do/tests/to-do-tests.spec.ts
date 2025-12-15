import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}) => {
    //to not write it every time
    await page.goto('http://localhost:3000/react-to-do-app')
})

test('to see a title on a site', async ({page}) => {
    const toDoLabel = page.locator('h1')
    //check if we see label 'To-Do List'
    await expect(toDoLabel).toBeVisible()
})

test('to add a new task', async ({page}) => {
    const taskText = 'Go gym with my friend John'
    const inputTask = page.locator('.taskInput')
    const enterBtn = page.locator('.enterBtn')
    //create a task
    await inputTask.fill(taskText)
    await enterBtn.click()
    //check if it is appear
    const ourNewTask = page.locator('li').filter({hasText:taskText})
    await expect(ourNewTask).toBeVisible()
})

test('to remove a task from the list', async ({page}) => {
    const taskText = 'Start doing my school project'
    const inputTask = page.locator('.taskInput')
    const enterBtn = page.locator('.enterBtn')

    //first we add a task
    await inputTask.fill(taskText)
    await enterBtn.click()
    //find the exact <li> item
    const ourNewTask = page.locator('li').filter({hasText:taskText})
    //tasting if task appear
    await expect(ourNewTask).toBeVisible()
    //after we add a task we can find exact removeBtn and test if we can remove a task
    const removeBtn = ourNewTask.locator('.removeBtn')

    await removeBtn.click()

    await expect(ourNewTask).not.toBeVisible()

})

test('to move task up', async ({ page }) => {
    const task1 = 'Start doing my school project'
    const task2 = 'Go walk my big brown dog'
    const task3 = 'Go to market and buy eggs'

    const inputTask = page.locator('.taskInput')
    const enterBtn = page.locator('.enterBtn')

    // add first task
    await inputTask.fill(task1)
    await enterBtn.click()
    // check if it is appear
    const newTask1 = page.locator('li').filter({ hasText: task1 })
    await expect(newTask1).toBeVisible()

    // add second task
    await inputTask.fill(task2)
    await enterBtn.click()
    // check if it is appear
    const newTask2 = page.locator('li').filter({ hasText: task2 })
    await expect(newTask2).toBeVisible()

    // add third task
    await inputTask.fill(task3)
    await enterBtn.click()
    // check if it is appear
    const newTask3 = page.locator('li').filter({ hasText: task3 })
    await expect(newTask3).toBeVisible()
    
    // check arder tasks
    const list = page.locator('li')
    await expect(list.nth(0).locator('.taskText')).toHaveText(task1)
    await expect(list.nth(1).locator('.taskText')).toHaveText(task2)
    await expect(list.nth(2).locator('.taskText')).toHaveText(task3)

    // find a move Up button and click 
    let task3Item = page.locator('li').filter({ hasText: task3 })
    let task3UpButton = task3Item.locator('.moveBtn >> text="Up"')
    await task3UpButton.click()

    // check order tasks after first move up
    await expect(list.nth(0).locator('.taskText')).toHaveText(task1)
    await expect(list.nth(1).locator('.taskText')).toHaveText(task3)
    await expect(list.nth(2).locator('.taskText')).toHaveText(task2)

    // click one more time 
    task3Item = page.locator('li').filter({ hasText: task3 })
    task3UpButton = task3Item.locator('.moveBtn >> text="Up"')
    await task3UpButton.click()

    // check order tasks after second move up
    await expect(list.nth(0).locator('.taskText')).toHaveText(task3)
    await expect(list.nth(1).locator('.taskText')).toHaveText(task1)
    await expect(list.nth(2).locator('.taskText')).toHaveText(task2)
});

test('to move task down', async ({page}) => {
    const task1 = 'Go to the bar with my friends'
    const task2 = 'Listen to the new electro album'
    const task3 = 'Cook dinner before my wife come home'
    
    const inputTask = page.locator('.taskInput')
    const enterBtn = page.locator('.enterBtn')

    // add first task
    await inputTask.fill(task1)
    await enterBtn.click()
    // check if it is appear
    const newTask1 = page.locator('li').filter({ hasText: task1 })
    await expect(newTask1).toBeVisible()

    // add second task
    await inputTask.fill(task2)
    await enterBtn.click()
    // check if it is appear
    const newTask2 = page.locator('li').filter({ hasText: task2 })
    await expect(newTask2).toBeVisible()

    // add third task
    await inputTask.fill(task3)
    await enterBtn.click()
    // check if it is appear
    const newTask3 = page.locator('li').filter({ hasText: task3 })
    await expect(newTask3).toBeVisible()
    
    // check arder tasks
    const list = page.locator('li')
    await expect(list.nth(0).locator('.taskText')).toHaveText(task1)
    await expect(list.nth(1).locator('.taskText')).toHaveText(task2)
    await expect(list.nth(2).locator('.taskText')).toHaveText(task3)

    // find a move Down button and click 
    let task1Item = page.locator('li').filter({ hasText: task1 })
    let task1DownButton = task1Item.locator('.moveBtn >> text="Down"')
    await task1DownButton.click()

    // check order tasks after first move down
    await expect(list.nth(0).locator('.taskText')).toHaveText(task2)
    await expect(list.nth(1).locator('.taskText')).toHaveText(task1)
    await expect(list.nth(2).locator('.taskText')).toHaveText(task3)

    // click one more time 
    task1Item = page.locator('li').filter({ hasText: task1 })
    task1DownButton = task1Item.locator('.moveBtn >> text="Down"')
    await task1DownButton.click()

    // check order tasks after second move down
    await expect(list.nth(0).locator('.taskText')).toHaveText(task2)
    await expect(list.nth(1).locator('.taskText')).toHaveText(task3)
    await expect(list.nth(2).locator('.taskText')).toHaveText(task1)
})

