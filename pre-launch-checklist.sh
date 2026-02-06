#!/bin/bash
# Pre-launch check script for Languages 4 website

echo "🚀 Starting Pre-Launch Checks..."
echo ""

# 1. Build Check
echo "📦 Building site..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build successful"
echo ""

# 2. TypeScript Check
echo "🔍 Checking TypeScript..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ No TypeScript errors"
else
    echo "⚠️  TypeScript warnings found"
fi
echo ""

# 3. Check for TODO/FIXME comments
echo "📝 Checking for TODO/FIXME comments..."
grep -r "TODO\|FIXME" src/ --exclude-dir=node_modules || echo "✅ No TODOs found"
echo ""

# 4. Check for console.logs (shouldn't be in production)
echo "🔍 Checking for console.log statements..."
grep -r "console.log" src/ --exclude-dir=node_modules || echo "✅ No console.logs found"
echo ""

# 5. Check for broken internal links (basic)
echo "🔗 Checking for common broken links..."
grep -r "href=\"/trial\"" src/ && echo "⚠️  Found reference to /trial (page doesn't exist)"
grep -r "href=\"/newsletter\"" src/ && echo "⚠️  Found reference to /newsletter (should be /newsletters)"
echo ""

echo "✅ Pre-launch checks complete!"