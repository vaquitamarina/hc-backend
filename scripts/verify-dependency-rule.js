#!/usr/bin/env node
/**
 * Verificador de Dependency Rule - Arquitectura Hexagonal
 * 
 * Valida que:
 * ✅ domain/ NO importa de infrastructure/, db/, models/, routes/, controllers/
 * ✅ application/ NO importa de infrastructure/, routes/, controllers/
 * ✅ infrastructure/ PUEDE importar de domain/ y application/
 * 
 * USO: node scripts/verify-dependency-rule.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');

// Configuración de validación
const RULES = {
  domain: {
    forbidden: [
      'infrastructure',
      'models',
      'db',
      'routes',
      'controllers',
      'application/services',
    ],
    allowedExternal: [
      // Las imports de domain pueden usar cualquier cosa del domain
    ],
  },
  application: {
    forbidden: ['infrastructure', 'routes', 'controllers', 'models', 'db'],
    allowedExternal: [
      // application puede importar de domain
    ],
  },
  infrastructure: {
    forbidden: [],
    allowedExternal: ['domain', 'application'],
  },
};

// Colores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
};

/**
 * Obtiene todos los archivos .js en un directorio
 */
function getAllJsFiles(dir) {
  const files = [];
  const traverse = (currentPath) => {
    if (!fs.existsSync(currentPath)) return;

    const entries = fs.readdirSync(currentPath);
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (entry.endsWith('.js')) {
        files.push(fullPath);
      }
    }
  };

  traverse(dir);
  return files;
}

/**
 * Extrae todos los imports de un archivo
 */
function getImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex =
    /import\s+(?:.*\s+)?from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

/**
 * Determina la capa de un archivo
 */
function getLayer(filePath) {
  if (filePath.includes('/domain/')) return 'domain';
  if (filePath.includes('/application/')) return 'application';
  if (filePath.includes('/infrastructure/')) return 'infrastructure';
  return 'other';
}

/**
 * Verifica si una importación viola las reglas
 */
function validateImport(filePath, importPath, layer) {
  const rules = RULES[layer];
  if (!rules) return null;

  // Normalizar ruta de import
  const resolvedPath = resolveImportPath(filePath, importPath);
  const importLayer = getLayer(resolvedPath);

  // Si es una importación local
  if (importPath.startsWith('.')) {
    // Detectar si intenta importar de una capa prohibida
    for (const forbidden of rules.forbidden) {
      if (importPath.includes(forbidden)) {
        return {
          valid: false,
          reason: `Layer '${layer}' cannot import from '${forbidden}'`,
          importPath,
        };
      }
    }
  }

  return { valid: true };
}

/**
 * Resuelve una ruta relativa de importación
 */
function resolveImportPath(fromFile, importPath) {
  if (importPath.startsWith('.')) {
    return path.resolve(path.dirname(fromFile), importPath);
  }
  return importPath;
}

/**
 * Ejecuta la verificación
 */
function verify() {
  log.info('Iniciando verificación de Dependency Rule...\n');

  const layers = ['domain', 'application', 'infrastructure'];
  let violations = [];
  let totalFiles = 0;
  let totalImports = 0;

  for (const layer of layers) {
    const layerPath = path.join(PROJECT_ROOT, layer);
    const files = getAllJsFiles(layerPath);

    log.info(`Verificando capa '${layer}' (${files.length} archivos)...`);

    for (const file of files) {
      totalFiles++;
      const imports = getImports(file);
      totalImports += imports.length;

      for (const importPath of imports) {
        const validation = validateImport(file, importPath, layer);

        if (validation && !validation.valid) {
          violations.push({
            file: path.relative(PROJECT_ROOT, file),
            layer,
            importPath,
            reason: validation.reason,
          });
        }
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('REPORTE DE VERIFICACIÓN - DEPENDENCY RULE');
  console.log('='.repeat(70) + '\n');

  log.info(`Total de archivos analizados: ${totalFiles}`);
  log.info(`Total de imports analizados: ${totalImports}\n`);

  if (violations.length === 0) {
    log.success('✓ Dependency Rule cumplida en todas las capas\n');
    console.log('CUMPLIMIENTO POR CAPA:');
    for (const layer of layers) {
      log.success(`  ${layer}/`);
    }
    console.log(
      '\n' +
        '='.repeat(70) +
        '\n'
    );
    return true;
  } else {
    log.error(
      `✗ Se encontraron ${violations.length} violación(es) de Dependency Rule\n`
    );

    console.log('VIOLACIONES ENCONTRADAS:\n');
    for (const violation of violations) {
      log.error(
        `${violation.file}\n  Capa: ${violation.layer}\n  Import: ${violation.importPath}\n  Razón: ${violation.reason}\n`
      );
    }

    console.log(
      '='.repeat(70) +
        '\n'
    );
    return false;
  }
}

// Ejecutar verificación
const isValid = verify();
process.exit(isValid ? 0 : 1);
