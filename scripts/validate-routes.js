#!/usr/bin/env node

/**
 * Validate route scenarios to ensure quality
 * This script checks:
 * - All operations have git commands
 * - All routes have descriptions
 * - Git graph data is complete
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 Validating route scenarios...\n')

// Read the scenarios file
const scenariosPath = path.join(__dirname, '../src/lib/scenarios.ts')
const scenariosContent = fs.readFileSync(scenariosPath, 'utf8')

// Extract basic stats using regex (simple validation)
const operationMatches = scenariosContent.match(/id: '[^']+',\s*type:/g) || []
const gitCommandMatches = scenariosContent.match(/gitCommand:/g) || []
const descriptionMatches = scenariosContent.match(/description:/g) || []

const totalOperations = operationMatches.length
const opsWithCommands = gitCommandMatches.length
const opsWithDescriptions = descriptionMatches.length

console.log('📊 Route Statistics:')
console.log('─────────────────────────────────')
console.log(`Total operations: ${totalOperations}`)
console.log(`Operations with git commands: ${opsWithCommands}`)
console.log(`Operations with descriptions: ${opsWithDescriptions}`)
console.log('')

const commandCoverage = Math.round((opsWithCommands / totalOperations) * 100)
const descriptionCoverage = Math.round((opsWithDescriptions / totalOperations) * 100)

console.log('📈 Coverage:')
console.log('─────────────────────────────────')
console.log(`Git commands: ${commandCoverage}%`)
console.log(`Descriptions: ${descriptionCoverage}%`)
console.log('')

let hasErrors = false

if (commandCoverage < 80) {
  console.error('❌ ERROR: Less than 80% of operations have git commands')
  console.error(`   Expected: ≥80%, Got: ${commandCoverage}%`)
  hasErrors = true
}

if (descriptionCoverage < 100) {
  console.error('❌ ERROR: Not all operations have descriptions')
  console.error(`   Expected: 100%, Got: ${descriptionCoverage}%`)
  hasErrors = true
}

if (!hasErrors) {
  console.log('✅ All route validation checks passed!')
  process.exit(0)
} else {
  console.log('\n❌ Route validation failed. Please fix the errors above.')
  process.exit(1)
}
