import { test, expect } from '@playwright/test'

test.describe('TaskFlow App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('ajoute une tâche et l’affiche', async ({ page }) => {
    await page.fill('#task-input', 'Acheter du pain')
    await page.click('button[type="submit"]')

    await expect(page.locator('text=Acheter du pain')).toBeVisible()
  })

  test('coche une tâche comme terminée', async ({ page }) => {
    await page.fill('#task-input', 'Tâche à cocher')
    await page.click('button[type="submit"]')

    const checkbox = page.locator('li.task-item input.task-checkbox').first()
    await checkbox.check()
    await expect(checkbox).toBeChecked()
  })

  test('supprime une tâche', async ({ page }) => {
    await page.fill('#task-input', 'Tâche à supprimer')
    await page.click('button[type="submit"]')

    const item = page.locator('li.task-item', { hasText: 'Tâche à supprimer' })
    await expect(item).toBeVisible()

    await item.locator('button.task-delete').click()
    await expect(page.locator('text=Tâche à supprimer')).toHaveCount(0)
  })
})

