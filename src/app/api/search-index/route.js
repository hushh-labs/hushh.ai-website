import { NextResponse } from 'next/server';
import { getContentIndexer } from '../../_components/utils/contentIndexer';

// This API route builds the search index on the server side
export async function GET() {
  try {
    console.log('🚀 Building search index via API endpoint...');
    
    const indexer = getContentIndexer();
    const searchIndex = await indexer.buildSearchIndex();
    
    console.log(`✅ Search index built successfully with ${searchIndex.length} items`);
    
    return NextResponse.json({
      success: true,
      data: searchIndex,
      count: searchIndex.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error building search index:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      data: [],
      count: 0
    }, { status: 500 });
  }
} 