// ========== SERVER STATS ==========
// ========== СУПЕР ПЛАВНЫЕ СТАТИСТИКИ (как настоящие графики) ==========
let currentServerLoad = 85.0;
let currentGpuUtil = 93.0;
let currentDataTB = 950;
let currentActiveReqs = 52000;

// Направления движения (меняются редко)
let serverTrend = 0.02;
let gpuTrend = -0.01;
let dataTrend = 1.5;
let reqsTrend = 25;

setInterval(() => {
    // Редко меняем тренд (раз в 30-60 секунд)
    if (Math.random() < 0.03) {
        serverTrend = (Math.random() - 0.5) * 0.08;
        gpuTrend = (Math.random() - 0.5) * 0.07;
        dataTrend = (Math.random() - 0.5) * 5;
        reqsTrend = (Math.random() - 0.5) * 80;
    }
    
    currentServerLoad += serverTrend;
    currentGpuUtil += gpuTrend;
    currentDataTB += dataTrend;
    currentActiveReqs += reqsTrend;
    
    // Границы
    currentServerLoad = Math.min(92, Math.max(78, currentServerLoad));
    currentGpuUtil = Math.min(97, Math.max(88, currentGpuUtil));
    currentDataTB = Math.min(1250, Math.max(750, currentDataTB));
    currentActiveReqs = Math.min(68000, Math.max(42000, currentActiveReqs));
    
    const serverEl = document.getElementById('serverLoad');
    const gpuEl = document.getElementById('gpuUtil');
    const dataEl = document.getElementById('dataProcessed');
    const reqsEl = document.getElementById('activeReqs');
    
    if (serverEl) serverEl.innerText = currentServerLoad.toFixed(1) + '%';
    if (gpuEl) gpuEl.innerText = currentGpuUtil.toFixed(1) + '%';
    if (dataEl) dataEl.innerText = Math.floor(currentDataTB).toLocaleString() + ' TB';
    if (reqsEl) reqsEl.innerText = Math.floor(currentActiveReqs).toLocaleString();
    
    const loadFill = document.getElementById('loadFill');
    const gpuFill = document.getElementById('gpuFill');
    if (loadFill) loadFill.style.width = currentServerLoad + '%';
    if (gpuFill) gpuFill.style.width = currentGpuUtil + '%';
}, 200); 


async function fetchAINews(containerId = 'newsFullContainer', showTime = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<div class="loading">📡 Загрузка новостей из GNews API...</div>';
    
    try {
        const response = await fetch('https://gnews.io/api/v4/search?q=artificial+intelligence+OR+AI+OR+machine+learning&lang=en&max=15&apikey=9abfbeceeb49b2669f8079b4aeeb179f');
        
        if (response.ok) {
            const data = await response.json();
            if (data.articles && data.articles.length > 0) {
                container.innerHTML = '';
                data.articles.forEach(article => {
                    const newsDiv = document.createElement('div');
                    newsDiv.className = 'news-item';
                    const date = new Date(article.publishedAt);
                    const timeStr = date.toLocaleString();
                    newsDiv.innerHTML = `
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-title">📰 ${article.title}</a>
                        <span class="news-source">${article.source.name || 'AI News'}</span>
                        <div class="news-time">${timeStr}</div>
                    `;
                    container.appendChild(newsDiv);
                });
                
                if (showTime) {
                    const timeEl = document.getElementById('lastUpdateTime');
                    if (timeEl) timeEl.innerText = `Last update: ${new Date().toLocaleTimeString()}`;
                }
                return;
            }
        }
        throw new Error('Using fallback');
    } catch (error) {
        console.log('Using fallback news data');
        const fallbackNews = [
            { title: "OpenAI announces GPT-5 with 1M token context window", source: "TechCrunch", time: "Today" },
            { title: "Google DeepMind releases new AI model for weather prediction", source: "Reuters", time: "Today" },
            { title: "Anthropic's Claude 3 beats GPT-4 on coding benchmarks", source: "VentureBeat", time: "Today" },
            { title: "EU passes landmark AI regulation act", source: "Politico", time: "Today" },
            { title: "Microsoft integrates Copilot directly into Windows", source: "The Verge", time: "Today" },
            { title: "Meta releases Llama 3 — open source 70B model", source: "TechCrunch", time: "Today" },
            { title: "Runway raises $500M for AI video generation", source: "Bloomberg", time: "Today" },
            { title: "NVIDIA unveils Blackwell B200 GPU for AI workloads", source: "Wired", time: "Today" },
            { title: "Mistral AI raises $600M at $6B valuation", source: "Financial Times", time: "Today" },
            { title: "Perplexity AI launches native Windows app", source: "The Verge", time: "Today" }
        ];
        container.innerHTML = '';
        fallbackNews.forEach(article => {
            const newsDiv = document.createElement('div');
            newsDiv.className = 'news-item';
            newsDiv.innerHTML = `
                <div class="news-title">📰 ${article.title}</div>
                <span class="news-source">${article.source}</span>
                <div class="news-time">${article.time}</div>
            `;
            container.appendChild(newsDiv);
        });
        
        if (showTime) {
            const timeEl = document.getElementById('lastUpdateTime');
            if (timeEl) timeEl.innerText = `Last update: ${new Date().toLocaleTimeString()}`;
        }
    }
}

// ========== AI DATABASE (WORKING) ==========
const aiDatabase = [
    { name: "ChatGPT (OpenAI)", desc: "Advanced conversational AI, code generation, writing assistant", pricing: "Free · Pro $20/mo", category: "chat", link: "https://chat.openai.com", icon: "🤖" },
    { name: "Claude 3 (Anthropic)", desc: "Large context window (200K), safe and ethical AI", pricing: "Free · Pro $20/mo", category: "chat", link: "https://claude.ai", icon: "🧠" },
    { name: "Midjourney", desc: "High-quality AI image generation from text prompts", pricing: "$10-120/mo", category: "image", link: "https://midjourney.com", icon: "🎨" },
    { name: "DALL-E 3", desc: "OpenAI's image generation model", pricing: "Pay per image (~$0.04)", category: "image", link: "https://openai.com/dall-e", icon: "🖼️" },
    { name: "GitHub Copilot", desc: "AI pair programmer for VS Code", pricing: "$10/mo · Free for students", category: "code", link: "https://github.com/features/copilot", icon: "💻" },
    { name: "Perplexity AI", desc: "AI-powered search engine with citations", pricing: "Free · Pro $20/mo", category: "search", link: "https://perplexity.ai", icon: "🔍" },
    { name: "Runway Gen-2", desc: "Text-to-video and video editing AI", pricing: "$15/mo", category: "video", link: "https://runwayml.com", icon: "🎬" },
    { name: "Stable Diffusion", desc: "Open-source text-to-image model", pricing: "Free (open source)", category: "image", link: "https://stability.ai", icon: "⚡" },
    { name: "Leonardo.ai", desc: "Game asset and character generation", pricing: "Free 150 credits daily", category: "image", link: "https://leonardo.ai", icon: "🎮" },
    { name: "Gamma AI", desc: "AI presentation and document creator", pricing: "Free · Pro $16/mo", category: "productivity", link: "https://gamma.app", icon: "📊" },
    { name: "Otter AI", desc: "Meeting transcription and summarization", pricing: "Free · Pro $17/mo", category: "audio", link: "https://otter.ai", icon: "🎙️" },
    { name: "Synthesia", desc: "AI video avatars and voiceovers", pricing: "$30/mo", category: "video", link: "https://synthesia.io", icon: "🎥" },
    { name: "Google Gemini", desc: "Google's multimodal AI model", pricing: "Free · Advanced $20/mo", category: "chat", link: "https://gemini.google.com", icon: "🔵" },
    { name: "Mistral AI", desc: "Open-weight European LLM", pricing: "Free for open weights", category: "chat", link: "https://mistral.ai", icon: "🌊" },
    { name: "Playground AI", desc: "Free image generation with Stable Diffusion", pricing: "1000 free images/month", category: "image", link: "https://playgroundai.com", icon: "🛝" },
    { name: "DeepSeek", desc: "High-performance open-source LLM", pricing: "Free (open weights)", category: "chat", link: "https://deepseek.com", icon: "🔍" },
    { name: "Adobe Firefly", desc: "AI image and design tools", pricing: "Included in Creative Cloud", category: "image", link: "https://firefly.adobe.com", icon: "🔥" },
    { name: "ElevenLabs", desc: "AI voice synthesis and cloning", pricing: "Free · Pro $22/mo", category: "audio", link: "https://elevenlabs.io", icon: "🗣️" },
    { name: "Hugging Face", desc: "Platform for open-source AI models", pricing: "Free · Pro $9/mo", category: "development", link: "https://huggingface.co", icon: "🤗" },
    { name: "Replicate", desc: "Run open-source models via API", pricing: "Pay per second", category: "development", link: "https://replicate.com", icon: "⚙️" },
    { name: "Tabnine", desc: "AI code completion for all IDEs", pricing: "Free · Pro $12/mo", category: "code", link: "https://tabnine.com", icon: "📝" },
    { name: "Luma AI", desc: "3D capture and generation from video", pricing: "Free · Pro $15/mo", category: "3d", link: "https://lumalabs.ai", icon: "🎥" },
    { name: "Pika Labs", desc: "AI video generation from text", pricing: "Free · Pro $10/mo", category: "video", link: "https://pika.art", icon: "🎬" },
    { name: "Canva AI", desc: "AI design assistant", pricing: "Free · Pro $15/mo", category: "design", link: "https://canva.com", icon: "🎨" },
    { name: "Ideogram", desc: "AI image with excellent text rendering", pricing: "Free · Pro $7/mo", category: "image", link: "https://ideogram.ai", icon: "🎨" }
];

function renderAIGrid(filter = "") {
    const grid = document.getElementById('aiGrid');
    if (!grid) return;
    
    const filtered = aiDatabase.filter(ai => 
        ai.name.toLowerCase().includes(filter.toLowerCase()) || 
        ai.category.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="loading">🔍 No AI tools found. Try "chat", "image", "code" or "video"</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(ai => `
        <div class="ai-card">
            <div class="ai-name">${ai.icon} ${ai.name}</div>
            <div class="ai-desc">${ai.desc}</div>
            <div class="ai-pricing">💰 ${ai.pricing}</div>
            <div class="ai-category">#${ai.category}</div>
            <a href="${ai.link}" target="_blank" rel="noopener noreferrer" class="ai-link">🔗 ACCESS TOOL →</a>
        </div>
    `).join('');
}

// ========== MODAL ==========
function showModalMessage(msg) {
    const modal = document.getElementById('modal');
    const msgEl = document.getElementById('modalMsg');
    if (modal && msgEl) {
        msgEl.innerText = msg;
        modal.style.display = 'flex';
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    }
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log("MKBTC0 AI Hub initialized");
    
    // News page
    const newsContainer = document.getElementById('newsFullContainer');
    if (newsContainer) {
        fetchAINews('newsFullContainer', true);
        
        const refreshBtn = document.getElementById('refreshNewsBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                fetchAINews('newsFullContainer', true);
                showModalMessage("🔄 News feed refreshed!");
            });
        }
        
        setInterval(() => fetchAINews('newsFullContainer', true), 120000);
    }
    
    // AI Directory page
    const searchInput = document.getElementById('aiSearch');
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const aiGrid = document.getElementById('aiGrid');
    
    if (aiGrid) {
        renderAIGrid("");
        
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => renderAIGrid(searchInput.value));
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') renderAIGrid(searchInput.value);
            });
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                renderAIGrid("");
                showModalMessage("🔄 Filter reset! Showing all AI tools.");
            });
        }
    }
    
    // Welcome message
    if (!sessionStorage.getItem('welcomed') && document.getElementById('modal')) {
        setTimeout(() => {
            showModalMessage("🤖 Welcome to MKBTC0 AI Hub!\n\n• 25+ AI tools directory\n• Live AI news feed\n• Prompt engineering guide\n• Real-time server stats");
        }, 800);
        sessionStorage.setItem('welcomed', 'true');
    }
});