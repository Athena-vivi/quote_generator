/**
 * 完整的中英文金句图片生成器
 * chinese-quote-generator.js
 */

/**
 * 中文金句生成器
 * 专门处理中文字符的布局和渲染
 */
class ChineseQuoteGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.scale = 2;
        this.canvasSize = 600;
        
        // 中文字体配置
        this.fonts = {
            title: 'bold 32px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif',
            quote: '500 30px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif',
            author: 'normal 26px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif'
        };
        
        // 布局配置
        this.layout = {
            maxWidth: 380,
            lineHeight: 42,
            titleY: 75,
            authorY: 510,
            authorX: 500,
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
     * 智能文本换行 - 专为中文优化
     */
    wrapChineseText(text, maxWidth) {
        this.ctx.font = this.fonts.quote;
        
        const lines = [];
        const chars = Array.from(text); // 正确处理emoji和特殊字符
        let currentLine = '';
        
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            const testLine = currentLine + char;
            const metrics = this.ctx.measureText(testLine);
            
            // 为中文字符预留更多空间，防止溢出
            const safeMaxWidth = maxWidth * 0.85;
            
            if (metrics.width > safeMaxWidth && currentLine !== '') {
                // 检查是否在标点符号处，避免标点符号单独成行
                if (this.isPunctuation(char) && currentLine.length > 0) {
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
     * 检查是否为标点符号
     */
    isPunctuation(char) {
        const punctuation = '，。、；：？！""''（）【】';
        return punctuation.includes(char);
    }
    
    /**
     * 绘制标题
     */
    drawTitle() {
        this.ctx.font = this.fonts.title;
        this.ctx.textAlign = 'center';
        
        const dailyText = 'Daily';
        const wisdomText = 'Wisdom';
        
        // 测量文字宽度
        const dailyWidth = this.ctx.measureText(dailyText).width;
        const wisdomWidth = this.ctx.measureText(wisdomText).width;
        const spacing = 16;
        
        const totalWidth = dailyWidth + spacing + wisdomWidth;
        const startX = (this.canvasSize - totalWidth) / 2;
        
        // 绘制 "Daily"
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = this.colors.titleWhite;
        this.ctx.fillText(dailyText, startX, this.layout.titleY);
        
        // 绘制 "Wisdom"
        this.ctx.fillStyle = this.colors.titleGold;
        this.ctx.fillText(wisdomText, startX + dailyWidth + spacing, this.layout.titleY);
    }
    
    /**
     * 绘制金句文本
     */
    drawQuoteText(text) {
        const lines = this.wrapChineseText(text, this.layout.maxWidth);
        
        // 计算文本块的总高度
        const totalTextHeight = lines.length * this.layout.lineHeight;
        const startY = (this.canvasSize - totalTextHeight) / 2 + this.layout.lineHeight * 0.4;
        
        this.ctx.font = this.fonts.quote;
        this.ctx.fillStyle = this.colors.quoteText;
        this.ctx.textAlign = 'center';
        
        // 绘制每一行
        lines.forEach((line, index) => {
            const y = startY + index * this.layout.lineHeight;
            this.ctx.fillText(line, this.canvasSize / 2, y);
        });
        
        // 在最后一行末尾绘制装饰点
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            const lastLineWidth = this.ctx.measureText(lastLine).width;
            const dotX = this.canvasSize / 2 + lastLineWidth / 2 + 10;
            const dotY = startY + (lines.length - 1) * this.layout.lineHeight;
            
            this.ctx.fillStyle = this.colors.dot;
            this.ctx.beginPath();
            this.ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        
        return lines.length; // 返回行数，用于后续布局调整
    }
    
    /**
     * 绘制作者信息
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
            
            // 根据行数动态调整作者位置
            if (lineCount > 4) {
                this.layout.authorY = Math.min(530, this.layout.authorY + (lineCount - 4) * 10);
            }
            
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
}

/**
 * 英文金句生成器
 * 使用原有逻辑，针对英文进行优化
 */
class EnglishQuoteGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.scale = 2;
        this.canvasSize = 600;
    }
    
    /**
     * 生成并下载英文金句图片
     */
    async generateAndDownload(quote) {
        try {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            
            this.canvas.width = this.canvasSize * this.scale;
            this.canvas.height = this.canvasSize * this.scale;
            this.canvas.style.width = `${this.canvasSize}px`;
            this.canvas.style.height = `${this.canvasSize}px`;
            
            this.ctx.scale(this.scale, this.scale);
            
            // 背景
            this.ctx.fillStyle = '#0f172a'; // slate-900
            this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
            
            // 设置英文字体
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '500 36px "Playfair Display", serif';
            this.ctx.textAlign = 'center';
            
            const maxWidth = 480;
            const lineHeight = 50;
            
            // 英文单词换行
            let words = quote.text.split(' ');
            let lines = [];
            let currentLine = '';
            
            for (let i = 0; i < words.length; i++) {
                const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
                const metrics = this.ctx.measureText(testLine);
                
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
            
            // 绘制主要文本
            const totalTextHeight = lines.length * lineHeight;
            const startY = (this.canvasSize - totalTextHeight) / 2 + lineHeight * 0.8;
            
            lines.forEach((line, index) => {
                this.ctx.fillText(line, this.canvasSize / 2, startY + index * lineHeight);
            });
            
            // 绘制标题 "Daily Wisdom"
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 36px "Playfair Display", serif';
            this.ctx.textAlign = 'center';
            
            const dailyText = 'Daily';
            const wisdomText = 'Wisdom';
            const dailyWidth = this.ctx.measureText(dailyText).width;
            const wisdomWidth = this.ctx.measureText(wisdomText).width;
            const spacing = 16;
            
            const totalTitleWidth = dailyWidth + spacing + wisdomWidth;
            const titleStartX = (this.canvasSize - totalTitleWidth) / 2;
            
            this.ctx.textAlign = 'left';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(dailyText, titleStartX, 94);
            
            this.ctx.fillStyle = '#f59e0b'; // amber-400
            this.ctx.fillText(wisdomText, titleStartX + dailyWidth + spacing, 94);
            
            // 绘制装饰点
            if (lines.length > 0) {
                const lastLine = lines[lines.length - 1];
                const lastLineWidth = this.ctx.measureText(lastLine).width;
                this.ctx.fillStyle = '#f59e0b';
                this.ctx.beginPath();
                this.ctx.arc(this.canvasSize / 2 + lastLineWidth / 2 + 15, startY + (lines.length - 1) * lineHeight - 8, 4, 0, 2 * Math.PI);
                this.ctx.fill();
            }
            
            // 绘制作者
            const authorText = `@${quote.author}`;
            this.ctx.fillStyle = '#cbd5e1'; // slate-300
            this.ctx.font = 'normal 36px "Playfair Display", serif';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(authorText, 536, 548);
            
            // 下载
            return new Promise((resolve, reject) => {
                this.canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = `investment-quote-${Date.now()}.png`;
                        link.href = url;
                        
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        URL.revokeObjectURL(url);
                        resolve(true);
                    } else {
                        reject(new Error('Failed to generate image'));
                    }
                }, 'image/png', 1.0);
            });
            
        } catch (error) {
            console.error('English quote generation failed:', error);
            throw error;
        }
    }
}

/**
 * 智能下载管理器
 * 自动选择合适的生成器
 */
class QuoteDownloadManager {
    constructor() {
        this.chineseGenerator = new ChineseQuoteGenerator();
        this.englishGenerator = new EnglishQuoteGenerator();
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
                // 使用英文生成器
                console.log('使用英文生成器');
                await this.englishGenerator.generateAndDownload(quote);
                this.showMessage('Quote downloaded successfully!', 'success');
            }
            
        } catch (error) {
            console.error('下载失败:', error);
            this.showMessage('下载失败，请重试 / Download failed, please try again', 'error');
        }
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
    
    /**
     * 获取当前语言类型（用于调试）
     */
    detectLanguage(quote) {
        if (ChineseQuoteGenerator.isChinese(quote.text) || 
            ChineseQuoteGenerator.isChinese(quote.author)) {
            return 'Chinese';
        }
        return 'English';
    }
}
