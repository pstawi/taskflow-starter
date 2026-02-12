/**
 * Tests pour le module tasks.js
 *
 * OBJECTIF JOUR 3 : Atteindre une couverture de code >= 70%
 *
 * Tests existants : 2 (exemple)
 * Tests à ajouter : ~5-8 pour atteindre 70%
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  createTask,
  addTask,
  deleteTask,
  toggleTask,
  filterTasks,
  clearCompleted,
  countTasks,
  sortByPriority,
  loadTasks,
  saveTasks,
  TaskManager,
} from '../src/tasks.js'

// Mock léger de localStorage pour les fonctions loadTasks/saveTasks
const localStorageMock = {
  store: {},
  getItem(key) {
    return this.store[key] || null
  },
  setItem(key, value) {
    this.store[key] = value
  },
  removeItem(key) {
    delete this.store[key]
  },
  clear() {
    this.store = {}
  },
}

global.localStorage = localStorageMock

describe('createTask', () => {
  it('devrait créer une tâche avec les propriétés par défaut', () => {
    const task = createTask('Ma nouvelle tâche')

    expect(task).toHaveProperty('id')
    expect(task.text).toBe('Ma nouvelle tâche')
    expect(task.priority).toBe('medium')
    expect(task.completed).toBe(false)
    expect(task).toHaveProperty('createdAt')
  })

  it('devrait créer une tâche avec une priorité personnalisée', () => {
    const task = createTask('Tâche urgente', 'high')

    expect(task.priority).toBe('high')
  })

  it("devrait refuser un texte vide après trim", () => {
    expect(() => createTask('   ')).toThrow(
      'Le texte de la tâche ne peut pas être vide',
    )
  })

  it("devrait refuser un texte non défini ou non string", () => {
    expect(() => createTask(undefined)).toThrow(
      'Le texte de la tâche est requis',
    )
    expect(() => createTask(null)).toThrow('Le texte de la tâche est requis')
    // @ts-expect-error test de robustesse runtime
    expect(() => createTask(42)).toThrow('Le texte de la tâche est requis')
  })

  it('devrait refuser une priorité invalide', () => {
    expect(() => createTask('Tâche', 'urgent')).toThrow('Priorité invalide')
  })

  it('devrait trimmer le texte de la tâche', () => {
    const task = createTask('   texte avec espaces   ')
    expect(task.text).toBe('texte avec espaces')
  })
})

describe('addTask', () => {
  it('devrait ajouter une tâche à la liste', () => {
    const tasks = []
    const newTask = createTask('Test')

    const result = addTask(tasks, newTask)

    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Test')
  })

  it('devrait ajouter une tâche à une liste non vide', () => {
    const existing = [createTask('Existante')]
    const newTask = createTask('Nouvelle')

    const result = addTask(existing, newTask)

    expect(result).toHaveLength(2)
    expect(result[0].text).toBe('Existante')
    expect(result[1].text).toBe('Nouvelle')
  })

  it("ne doit pas muter la liste d'origine", () => {
    const existing = [createTask('Existante')]
    const newTask = createTask('Nouvelle')

    const result = addTask(existing, newTask)

    expect(existing).toHaveLength(1)
    expect(result).not.toBe(existing)
  })
})

describe('deleteTask', () => {
  it('devrait supprimer une tâche existante', () => {
    const t1 = createTask('A')
    const t2 = createTask('B')
    const tasks = [t1, t2]

    const result = deleteTask(tasks, t1.id)

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(t2.id)
  })

  it("ne doit rien supprimer si l'ID n'existe pas", () => {
    const t1 = createTask('A')
    const tasks = [t1]

    const result = deleteTask(tasks, 'inexistant')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(t1.id)
  })

  it("ne doit pas muter la liste d'origine", () => {
    const t1 = createTask('A')
    const tasks = [t1]

    const result = deleteTask(tasks, t1.id)

    expect(tasks).toHaveLength(1)
    expect(result).not.toBe(tasks)
  })
})

describe('toggleTask', () => {
  it("devrait basculer l'état completed", () => {
    const t1 = { ...createTask('A'), completed: false }
    const tasks = [t1]

    const toggled = toggleTask(tasks, t1.id)
    expect(toggled[0].completed).toBe(true)

    const toggledBack = toggleTask(toggled, t1.id)
    expect(toggledBack[0].completed).toBe(false)
  })

  it("ne doit rien changer si l'ID est inconnu", () => {
    const t1 = createTask('A')
    const tasks = [t1]

    const result = toggleTask(tasks, 'inexistant')
    expect(result[0].completed).toBe(false)
  })
})

describe('filterTasks', () => {
  let tasks

  beforeEach(() => {
    const t1 = { ...createTask('A'), completed: false }
    const t2 = { ...createTask('B'), completed: true }
    tasks = [t1, t2]
  })

  it('devrait retourner toutes les tâches pour le filtre all', () => {
    expect(filterTasks(tasks, 'all')).toHaveLength(2)
  })

  it('devrait retourner uniquement les tâches actives', () => {
    const active = filterTasks(tasks, 'active')
    expect(active).toHaveLength(1)
    expect(active[0].completed).toBe(false)
  })

  it('devrait retourner uniquement les tâches terminées', () => {
    const completed = filterTasks(tasks, 'completed')
    expect(completed).toHaveLength(1)
    expect(completed[0].completed).toBe(true)
  })
})

describe('clearCompleted', () => {
  it('devrait supprimer toutes les tâches complétées', () => {
    const t1 = { ...createTask('A'), completed: false }
    const t2 = { ...createTask('B'), completed: true }
    const t3 = { ...createTask('C'), completed: true }
    const tasks = [t1, t2, t3]

    const result = clearCompleted(tasks)
    expect(result).toHaveLength(1)
    expect(result[0].completed).toBe(false)
  })
})

describe('countTasks', () => {
  it('devrait compter correctement total / active / completed', () => {
    const t1 = { ...createTask('A'), completed: false }
    const t2 = { ...createTask('B'), completed: true }
    const t3 = { ...createTask('C'), completed: false }
    const tasks = [t1, t2, t3]

    const counts = countTasks(tasks)
    expect(counts.total).toBe(3)
    expect(counts.completed).toBe(1)
    expect(counts.active).toBe(2)
  })

  it('devrait retourner des zéros pour une liste vide', () => {
    const counts = countTasks([])
    expect(counts.total).toBe(0)
    expect(counts.completed).toBe(0)
    expect(counts.active).toBe(0)
  })
})

describe('sortByPriority', () => {
  it('devrait trier high > medium > low', () => {
    const low = { ...createTask('Low', 'low') }
    const high = { ...createTask('High', 'high') }
    const med = { ...createTask('Med', 'medium') }

    const tasks = [low, high, med]
    const sorted = sortByPriority(tasks)

    expect(sorted.map((t) => t.priority)).toEqual(['high', 'medium', 'low'])
    // immutabilité : ne pas muter la liste d'origine
    expect(tasks[0].priority).toBe('low')
  })
})

describe('loadTasks / saveTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('devrait retourner un tableau vide si rien en storage', () => {
    const tasks = loadTasks()
    expect(Array.isArray(tasks)).toBe(true)
    expect(tasks).toHaveLength(0)
  })

  it('devrait sauvegarder puis recharger les tâches', () => {
    const t1 = createTask('Persistante')
    saveTasks([t1])

    const loaded = loadTasks()
    expect(loaded).toHaveLength(1)
    expect(loaded[0].text).toBe('Persistante')
  })
})

describe('filterByStatus', () => {
  let manager

  beforeEach(() => {
    localStorage.clear()
    manager = new TaskManager()
    manager.addTask('Task 1')
    manager.addTask('Task 2')
    manager.addTask('Task 3')
    manager.toggleTask(manager.getTasks()[0].id) // Complete first task
  })

  test('should return all tasks with "all" filter', () => {
    const filtered = manager.filterByStatus('all')
    expect(filtered).toHaveLength(3)
  })

  test('should return only completed tasks', () => {
    const filtered = manager.filterByStatus('completed')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].completed).toBe(true)
  })

  test('should return only pending tasks', () => {
    const filtered = manager.filterByStatus('pending')
    expect(filtered).toHaveLength(2)
    filtered.forEach((t) => expect(t.completed).toBe(false))
  })
})

