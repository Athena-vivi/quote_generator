<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Investment Quote Generator - Create Wisdom Cards from Famous Investors</title>
    <meta name="description" content="Generate beautiful quote cards featuring wisdom from legendary investors like Warren Buffett, Charlie Munger, and Peter Lynch. Download and share investment insights.">
    <link rel="canonical" href="https://investmentquotes.com/generator">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .quote-card {
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.1) 0%, transparent 50%);
        }
    </style>
</head>
<body class="min-h-screen bg-gray-100 p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
        <header class="text-center mb-8">
            <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-slate-800">
                Investment Quote Generator
            </h1>
            <p class="text-base sm:text-lg text-slate-600">Create beautiful wisdom cards featuring insights from legendary investors</p>
        </header>
        
        <!-- Quote Card Display -->
        <section class="mb-8 flex justify-center">
            <div id="quote-card" class="w-full aspect-square max-w-lg mx-auto md:w-[600px] md:h-[600px] md:max-w-none bg-slate-900 text-white relative rounded-lg shadow-2xl">
                <div class="absolute top-8 left-0 right-0 flex items-center justify-center md:top-16">
                    <span class="text-2xl md:text-4xl font-bold text-white mr-2 md:mr-4" style="font-family: 'Playfair Display', serif;">Daily</span>
                    <span class="text-2xl md:text-4xl font-bold text-amber-400" style="font-family: 'Playfair Display', serif;">Wisdom</span>
                </div>
                
                <div class="absolute inset-0 flex items-center justify-center px-8 md:px-16">
                    <div class="text-center">
                        <p id="quote-text" class="text-2xl md:text-4xl font-medium leading-normal md:leading-relaxed text-white" style="font-family: 'Playfair Display', serif;">
                            Time is the friend of wonderful businesses, the enemy of mediocre ones
                            <span class="text-amber-400 ml-2 md:ml-3 text-xl md:text-2xl">●</span>
                        </p>
                    </div>
                </div>
                
                <div class="absolute bottom-8 right-8 md:bottom-16 md:right-16">
                    <span id="quote-author" class="text-xl md:text-4xl font-normal text-slate-300" style="font-family: 'Playfair Display', serif;">@Warren Buffett</span>
                </div>
            </div>
        </section>
        
        <!-- Control Panel -->
        <section class="bg-white rounded-lg shadow-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Random Generation -->
                <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-slate-800">Random Quote Generation</h2>
                    <button id="random-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-lg">
                        <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                        Generate Random Quote
                    </button>
                    <p id="category-info" class="text-sm text-slate-600">Current Category: Investment Philosophy</p>
                    <p id="quote-count" class="text-xs text-slate-500">Quote Library: 80+ curated investment quotes</p>
                </div>
                
                <!-- Custom Input -->
                <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-slate-800">Create Custom Quote</h2>
                    <input type="text" id="custom-quote" placeholder="Enter your custom quote..." class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <input type="text" id="custom-author" placeholder="Enter author name..." class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <button id="custom-btn" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">Create Custom Quote</button>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-6">
                <h2 class="text-lg font-semibold text-slate-800 mb-4">Export & Share</h2>
                <div class="flex flex-wrap gap-4 justify-center">
                    <button id="download-btn" class="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center">
                        <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download Card
                    </button>
                    <button id="copy-btn" class="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center">
                        <svg class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy Text
                    </button>
                </div>
            </div>
        </section>
        
        <!-- How to Use -->
        <section class="mt-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h2 class="text-lg font-semibold text-slate-800 mb-4">How to Use the Investment Quote Generator</h2>
            <ul class="space-y-2 text-slate-600">
                <li>• Click "Generate Random Quote" to discover wisdom from legendary investors</li>
                <li>• Create your own custom quotes by entering text and author information</li>
                <li>• Download high-quality PNG images perfect for social media sharing</li>
                <li>• Copy quote text to clipboard for easy sharing across platforms</li>
                <li>• Our curated library features insights from Warren Buffett, Charlie Munger, Peter Lynch, and more</li>
            </ul>
        </section>

        <!-- Featured Investors -->
        <section class="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h2 class="text-lg font-semibold text-slate-800 mb-4">Featured Investment Masters</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div class="p-3 bg-slate-50 rounded-lg">
                    <p class="font-semibold text-slate-700">Warren Buffett</p>
                    <p class="text-sm text-slate-500">Value Investing</p>
                </div>
                <div class="p-3 bg-slate-50 rounded-lg">
                    <p class="font-semibold text-slate-700">Charlie Munger</p>
                    <p class="text-sm text-slate-500">Mental Models</p>
                </div>
                <div class="p-3 bg-slate-50 rounded-lg">
                    <p class="font-semibold text-slate-700">Peter Lynch</p>
                    <p class="text-sm text-slate-500">Growth Investing</p>
                </div>
                <div class="p-3 bg-slate-50 rounded-lg">
                    <p class="font-semibold text-slate-700">Ray Dalio</p>
                    <p class="text-sm text-slate-500">Principles</p>
                </div>
            </div>
        </section>
    </div>

<!-- Load quote data first -->
<script src="quotes-data.js"></script>

<!-- 中文金句生成器组件 -->
<script>
// 如果没有外部 quotes-data.js 文件，使用示例数据
if (typeof quotes === 'undefined') {
    var quotes = [
        {
            text: "Time is the friend of wonderful businesses, the enemy of mediocre ones",
            author: "Warren Buffett",
            category: "Investment Philosophy"
        },
        {
            text: "你退休后想干什么样的工作，那你现在就干什么样的工作，这才是理想工作",
            author: "巴菲特",
            category: "人生哲学"
        },
        {
            text: "Risk comes from not knowing what you're doing",
            author: "Warren Buffett",
            category: "Risk Management"
        },
        {
            text: "投资就像滚雪球，最重要的是发现很湿的雪和很长的坡",
            author: "沃伦·巴菲特",
            category: "投资策略"
        },
        {
            text: "The stock market is designed to transfer money from the Active to the Patient",
            author: "Warren Buffett",
            category: "Market Psychology"
        },
        {
            text: "在别人恐惧时我贪婪，在别人贪婪时我恐惧",
            author: "巴菲特",
            category: "投资心理"
        }
    ];
}

// 中文检测函数
function isChinese(text) {
    var chineseRegex = /[\u4e00-\u9fff]/g;
    var chineseMatches = text.match(chineseRegex);
    return chineseMatches && chineseMatches.length > text.length * 0.3;
}

// 中文下载函数
function downloadChineseQuote(currentQuote) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    
    var scale = 2;
    canvas.width = 600 * scale;
    canvas.height = 600 * scale;
    canvas.style.width = '600px';
    canvas.style.height = '600px';
    ctx.scale(scale, scale);
    
    // 背景
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 600, 600);
    
    // 中文字体设置 - 字号调整为34px，匹配英文视觉大小
    ctx.fillStyle = '#ffffff';
    ctx.font = '500 34px "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    var maxWidth = 480; // 与英文保持一致的最大宽度
    var lineHeight = 48; // 调整为48px，与英文50px接近但适合中文
    
    // 改进的中文换行处理
    function wrapChineseText(text, maxWidth) {
        var chars = Array.from(text);
        var lines = [];
        var currentLine = '';
        
        // 中文标点符号
        var punctuation = '，。、；：？！""''（）【】';
        var startPunctuation = '""''（【';
        var endPunctuation = '，。、；：？！""''）】';
        
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            var testLine = currentLine + char;
            var metrics = ctx.measureText(testLine);
            
            // 使用与英文一致的最大宽度，但保留安全边距
            if (metrics.width > maxWidth * 0.95 && currentLine !== '') {
                // 避免标点符号开头
                if (startPunctuation.indexOf(char) !== -1 && currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = char;
                } 
                // 避免标点符号单独成行，将其加到前一行
                else if (endPunctuation.indexOf(char) !== -1 && currentLine.length > 0) {
                    currentLine += char;
                    lines.push(currentLine);
                    currentLine = '';
                } else {
                    lines.push(currentLine);
                    currentLine = char;
                }
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    }
    
    var lines = wrapChineseText(currentQuote.text, maxWidth);
    
    // 绘制金句文本 - 使用与英文相同的垂直居中逻辑
    var totalTextHeight = lines.length * lineHeight;
    var startY = (600 - totalTextHeight) / 2 + lineHeight * 0.8; // 与英文保持一致的计算方式
    
    for (var j = 0; j < lines.length; j++) {
        var y = startY + j * lineHeight;
        ctx.fillText(lines[j], 300, y);
    }
    
    // 绘制装饰点 - 精确计算位置与英文保持一致
    if (lines.length > 0) {
        var lastLine = lines[lines.length - 1];
        var lastLineWidth = ctx.measureText(lastLine).width;
        var dotX = 300 + lastLineWidth / 2 + 15; // 与英文保持相同间距
        var dotY = startY + (lines.length - 1) * lineHeight - 8; // 与英文保持相同的垂直偏移
        
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, 2 * Math.PI); // 与英文保持相同大小
        ctx.fill();
    }
    
    // 绘制标题 - 与英文版保持完全一致的位置和样式
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif';
    ctx.textAlign = 'center';
    
    var dailyText = 'Daily';
    var wisdomText = 'Wisdom';
    var dailyWidth = ctx.measureText(dailyText).width;
    var wisdomWidth = ctx.measureText(wisdomText).width;
    var spacing = 16;
    
    var totalTitleWidth = dailyWidth + spacing + wisdomWidth;
    var titleStartX = (600 - totalTitleWidth) / 2;
    
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(dailyText, titleStartX, 94); // 与英文保持相同位置
    
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(wisdomText, titleStartX + dailyWidth + spacing, 94);
    
    // 绘制作者 - 与英文版保持完全一致的位置和字号
    ctx.font = 'normal 36px "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'right';
    ctx.fillText('@' + currentQuote.author, 536, 548); // 与英文保持完全相同的位置
    
    // 下载
    try {
        var link = document.createElement('a');
        link.download = 'chinese-quote-' + Date.now() + '.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showMessage('中文金句下载成功！', 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showMessage('下载失败，请重试', 'error');
    }
}
</script>

<!-- Then, load the main script that uses the data -->
<script>
// The 'quotes' variable is now available from quotes-data.js
var currentQuote = quotes[0];

function updateCard(quote, author, category) {
    var quoteTextElement = document.getElementById('quote-text');
    var dotSizeClass = quoteTextElement.classList.contains('md:text-4xl') ? 'md:text-2xl' : 'md:text-xl';
    
    quoteTextElement.innerHTML = quote + '<span class="text-amber-400 ml-2 md:ml-3 text-xl ' + dotSizeClass + '">●</span>';
    document.getElementById('quote-author').textContent = '@' + author;
    document.getElementById('category-info').textContent = 'Current Category: ' + category;
    document.getElementById('quote-count').textContent = 'Quote Library: ' + quotes.length + '+ curated investment quotes';
}

// Random quote generation
document.getElementById('random-btn').addEventListener('click', function() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    updateCard(currentQuote.text, currentQuote.author, currentQuote.category);
});

// Custom quote creation
document.getElementById('custom-btn').addEventListener('click', function() {
    var customQuote = document.getElementById('custom-quote').value.trim();
    var customAuthor = document.getElementById('custom-author').value.trim();
    
    if (customQuote && customAuthor) {
        currentQuote = {
            text: customQuote,
            author: customAuthor,
            category: "Custom"
        };
        updateCard(currentQuote.text, currentQuote.author, currentQuote.category);
        document.getElementById('custom-quote').value = '';
        document.getElementById('custom-author').value = '';
    } else {
        alert('Please enter both quote content and author information');
    }
});

// Download functionality - 修改这里集成中文支持
document.getElementById('download-btn').addEventListener('click', function() {
    // 检测是否为中文内容
    if (isChinese(currentQuote.text) || isChinese(currentQuote.author)) {
        console.log('检测到中文内容，使用中文专用生成器');
        downloadChineseQuote(currentQuote);
    } else {
        // 使用你原来的英文下载逻辑
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        var scale = 2;
        canvas.width = 600 * scale;
        canvas.height = 600 * scale;
        canvas.style.width = '600px';
        canvas.style.height = '600px';
        ctx.scale(scale, scale);
        
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.fillRect(0, 0, 600, 600);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 36px "Playfair Display", serif';
        ctx.textAlign = 'center';
        
        var maxWidth = 480;
        var lineHeight = 50;
        
        var words = currentQuote.text.split(' ');
        var lines = [];
        var currentLine = '';
        
        for (var i = 0; i < words.length; i++) {
            var testLine = currentLine + (currentLine ? ' ' : '') + words[i];
            var metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
        
        var totalTextHeight = lines.length * lineHeight;
        var startY = (600 - totalTextHeight) / 2 + lineHeight * 0.8;
        
        for (var j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j], 300, startY + j * lineHeight);
        }
        
        var textBounds = {
            left: 300 - maxWidth/2,
            right: 300 + maxWidth/2
        };
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Playfair Display", serif';
        ctx.textAlign = 'center';
        
        var dailyText = 'Daily';
        var wisdomText = 'Wisdom';
        var dailyWidth = ctx.measureText(dailyText).width;
        var wisdomWidth = ctx.measureText(wisdomText).width;
        var spacing = 16;
        
        var totalTitleWidth = dailyWidth + spacing + wisdomWidth;
        var titleStartX = (600 - totalTitleWidth) / 2;
        
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(dailyText, titleStartX, 94);
        
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(wisdomText, titleStartX + dailyWidth + spacing, 94);
        
        if (lines.length > 0) {
            var lastLine = lines[lines.length - 1];
            var lastLineWidth = ctx.measureText(lastLine).width;
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(300 + lastLineWidth / 2 + 15, startY + (lines.length - 1) * lineHeight - 8, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        var authorText = '@' + currentQuote.author;
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'normal 36px "Playfair Display", serif';
        ctx.textAlign = 'right';
        ctx.fillText(authorText, 536, 548);
        
        try {
            var link = document.createElement('a');
            link.download = 'investment-quote-' + Date.now() + '.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showMessage('Image downloaded successfully!', 'success');
        } catch (error) {
            console.error('Download failed:', error);
            showMessage('Download failed, please try again', 'error');
        }
    }
});

// Copy text functionality
document.getElementById('copy-btn').addEventListener('click', function() {
    var text = currentQuote.text + '\n— ' + currentQuote.author;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showMessage('Copied to clipboard!', 'success');
        }).catch(function() {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
});

// Fallback copy method
function fallbackCopyText(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showMessage('Copied to clipboard!', 'success');
    } catch (err) {
        showMessage('Copy failed, please copy manually', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show message notification
function showMessage(message, type) {
    var existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message-toast fixed top-4 right-4 px-4 py-2 rounded-lg text-white font-medium z-50 transition-all duration-300 ' + (type === 'success' ? 'bg-green-500' : 'bg-red-500');
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(function() {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with first quote and update count dynamically
    updateCard(currentQuote.text, currentQuote.author, currentQuote.category);
});
</script>
</body>
</html>
