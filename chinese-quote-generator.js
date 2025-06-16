/**
 * 中文金句图片生成器
 * 专门处理中文字符的布局和渲染，与英文版本保持完全一致的视觉效果
 */
class ChineseQuoteGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.scale = 2;
        this.canvasSize = 600;
        
        // 中文字体配置 - 使用衬线字体匹配英文Playfair Display的典雅风格
        this.fonts = {
            title: 'bold 36px "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif',
            quote: '500 34px "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif',
            author: 'normal 36px "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif'
        };
        
        // 布局配置 - 与英文版本完全一致
        this.layout = {
            maxWidth: 480,        // 与英文保持一致
            lineHeight: 48,       // 略小于英文50px，适合中文密度
            titleY: 94,           // 与英文完全相同
            authorY: 548,         // 与英文完全相同
            authorX: 536,         // 与英文完全相同
            padding: 60
        };
        
        // 颜色配置
        this.colors = {
            background: '#0f172a',
            titleWhite: '#ffffff',
            titleGold: '#f59e0b',
            quoteText: '#ffffff',
            authorText: '#cbd5e1',
            dot: '#f59e0b'
        };
    }
    
    /**
     * 检测文本是否主要包含中文字符
     */
    static isChinese(text) {
        const chineseRegex = /[\u4e00-\u9fff]/g;
        const chineseMatches = text.match(chineseRegex);
        return chineseMatches && chineseMatches.length > text.length * 0.3;
    }
    
    /**
     * 初始化画布
     */
    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = this.canvasSize * this.scale;
        this.canvas.height = this.canvasSize * this.scale;
        this.canvas.style.width = `${this.canvasSize}px`;
        this.canvas.style.height = `${this.canvasSize}px`;
        
        this.ctx.scale(this.scale, this.scale);
        
        // 设置文本渲染质量
        this.ctx.textBaseline = 'middle';
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }
    
    /**
     * 绘制背景
     */
    drawBackground() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
    }
    
    /**
     * 智能文本换行 - 专为中文优化，遵循排版规范
     */
    wrapChineseText(text, maxWidth) {
        this.ctx.font = this.fonts.quote;
        
        const lines = [];
        const chars = Array.from(text);
        let currentLine = '';
        
        // 中文标点符号分类
        const startPunctuation = '""''（【';
        const endPunctuation = '，。、；：？！""''）】';
        
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            const testLine = currentLine + char;
            const metrics = this.ctx.measureText(testLine);
            
            // 使用与英文一致的最大宽度，保留5%安全边距
            if (metrics.width > maxWidth * 0.95 && currentLine !== '') {
                // 避免开头标点
                if (startPunctuation.includes(char)) {
                    lines.push(currentLine);
                    currentLine = char;
                } 
                // 结尾标点跟随前行
                else if (endPunctuation.includes(char)) {
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
    
    /**
     * 绘制标题 - 与英文版完全相同的计算逻辑
     */
    drawTitle() {
        this.ctx.font = this.fonts.title;
        this.ctx.textAlign = 'center';
        
        const dailyText = 'Daily';
        const wisdomText = 'Wisdom';
        
        // 与英文版完全相同的计算逻辑
        const dailyWidth = this.ctx.measureText(dailyText).width;
        const wisdomWidth = this.ctx.measureText(wisdomText).width;
        const spacing = 16;
        
        const totalTitleWidth = dailyWidth + spacing + wisdomWidth;
        const titleStartX = (this.canvasSize - totalTitleWidth) / 2;
        
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = this.colors.titleWhite;
        this.ctx.fillText(dailyText, titleStartX, this.layout.titleY);
        
        this.ctx.fillStyle = this.colors.titleGold;
        this.ctx.fillText(wisdomText, titleStartX + dailyWidth + spacing, this.layout.titleY);
    }
    
    /**
     * 绘制金句文本 - 使用与英文版相同的垂直居中算法
     */
    drawQuoteText(text) {
        const lines = this.wrapChineseText(text, this.layout.maxWidth);
        
        // 与英文版完全相同的垂直居中计算
        const totalTextHeight = lines.length * this.layout.lineHeight;
        const startY = (this.canvasSize - totalTextHeight) / 2 + this.layout.lineHeight * 0.8;
        
        this.ctx.font = this.fonts.quote;
        this.ctx.fillStyle = this.colors.quoteText;
        this.ctx.textAlign = 'center';
        
        // 绘制每一行
        lines.forEach((line, index) => {
            const y = startY + index * this.layout.lineHeight;
            this.ctx.fillText(line, this.canvasSize / 2, y);
        });
        
        // 装饰点 - 与英文版完全相同的位置计算
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            const lastLineWidth = this.ctx.measureText(lastLine).width;
            const dotX = this.canvasSize / 2 + lastLineWidth / 2 + 15; // 与英文相同间距
            const dotY = startY + (lines.length - 1) * this.layout.lineHeight - 8; // 与英文相同偏移
            
            this.ctx.fillStyle = this.colors.dot;
            this.ctx.beginPath();
            this.ctx.arc(dotX, dotY, 4, 0, 2 * Math.PI); // 与英文相同大小
            this.ctx.fill();
        }
        
        return lines.length;
    }
    
    /**
     * 绘制作者信息 - 与英文版完全相同的位置
     */
    drawAuthor(author) {
        this.ctx.font = this.fonts.author;
        this.ctx.fillStyle = this.colors.authorText;
        this.ctx.textAlign = 'right';
        
        const authorText = `@${author}`;
        this.ctx.fillText(authorText, this.layout.authorX, this.layout.authorY);
    }
    
    /**
     * 生成并下载图片
     */
    async generateAndDownload(quote) {
        try {
            this.initCanvas();
            this.drawBackground();
            this.drawTitle();
            
            const lineCount = this.drawQuoteText(quote.text);
            this.drawAuthor(quote.author);
            
            // 转换为blob并下载
            return new Promise((resolve, reject) => {
                this.canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = `chinese-quote-${Date.now()}.png`;
                        link.href = url;
                        
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        URL.revokeObjectURL(url);
                        resolve(true);
                    } else {
                        reject(new Error('生成图片失败'));
                    }
                }, 'image/png', 1.0);
            });
            
        } catch (error) {
            console.error('生成中文金句图片失败:', error);
            throw error;
        }
    }
    
    /**
     * 获取预览canvas（用于显示预览）
     */
    getPreviewCanvas(quote) {
        this.initCanvas();
        this.drawBackground();
        this.drawTitle();
        this.drawQuoteText(quote.text);
        this.drawAuthor(quote.author);
        return this.canvas;
    }
}

// 使用示例和集成代码
class QuoteDownloadManager {
    constructor() {
        this.chineseGenerator = new ChineseQuoteGenerator();
    }
    
    /**
     * 智能选择生成器并下载
     */
    async downloadQuote(quote) {
        try {
            // 检测是否为中文内容
            if (ChineseQuoteGenerator.isChinese(quote.text) || 
                ChineseQuoteGenerator.isChinese(quote.author)) {
                
                console.log('检测到中文内容，使用中文专用生成器');
                await this.chineseGenerator.generateAndDownload(quote);
                this.showMessage('中文金句下载成功！', 'success');
                
            } else {
                // 使用原有的英文生成器
                console.log('使用英文生成器');
                await this.downloadEnglishQuote(quote);
                this.showMessage('Quote downloaded successfully!', 'success');
            }
            
        } catch (error) {
            console.error('下载失败:', error);
            this.showMessage('下载失败，请重试', 'error');
        }
    }
    
    /**
     * 原有的英文下载逻辑（保持不变）
     */
    async downloadEnglishQuote(quote) {
        // 这里需要放入你原来的英文下载代码
        // 为了保持组件完整性，这里提供一个示例实现
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const scale = 2;
        canvas.width = 600 * scale;
        canvas.height = 600 * scale;
        canvas.style.width = '600px';
        canvas.style.height = '600px';
        ctx.scale(scale, scale);
        
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 600, 600);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 36px "Playfair Display", serif';
        ctx.textAlign = 'center';
        
        const maxWidth = 480;
        const lineHeight = 50;
        
        let words = quote.text.split(' ');
        let lines = [];
        let currentLine = '';
        
        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
            const metrics = ctx.measureText(testLine);
            
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
        
        const totalTextHeight = lines.length * lineHeight;
        const startY = (600 - totalTextHeight) / 2 + lineHeight * 0.8;
        
        lines.forEach((line, index) => {
            ctx.fillText(line, 300, startY + index * lineHeight);
        });
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Playfair Display", serif';
        ctx.textAlign = 'center';
        
        const dailyText = 'Daily';
        const wisdomText = 'Wisdom';
        const dailyWidth = ctx.measureText(dailyText).width;
        const wisdomWidth = ctx.measureText(wisdomText).width;
        const spacing = 16;
        
        const totalTitleWidth = dailyWidth + spacing + wisdomWidth;
        const titleStartX = (600 - totalTitleWidth) / 2;
        
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(dailyText, titleStartX, 94);
        
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(wisdomText, titleStartX + dailyWidth + spacing, 94);
        
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            const lastLineWidth = ctx.measureText(lastLine).width;
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(300 + lastLineWidth / 2 + 15, startY + (lines.length - 1) * lineHeight - 8, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        const authorText = `@${quote.author}`;
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'normal 36px "Playfair Display", serif';
        ctx.textAlign = 'right';
        ctx.fillText(authorText, 536, 548);
        
        const link = document.createElement('a');
        link.download = `investment-quote-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    /**
     * 显示消息提示
     */
    showMessage(message, type) {
        const existingMessage = document.querySelector('.message-toast');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-toast fixed top-4 right-4 px-4 py-2 rounded-lg text-white font-medium z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// 集成到现有代码中
const downloadManager = new QuoteDownloadManager();

// 替换原有的下载按钮事件监听器
document.getElementById('download-btn').addEventListener('click', function() {
    downloadManager.downloadQuote(currentQuote);
});
