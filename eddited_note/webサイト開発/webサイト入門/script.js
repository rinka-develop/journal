// ページが読み込まれた時の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('Webサイトが読み込まれました！');
    
    // 要素を取得
    const colorButton = document.getElementById('colorButton');
    const countButton = document.getElementById('countButton');
    const colorBox = document.getElementById('colorBox');
    const counter = document.getElementById('counter');
    
    // カウンターの初期値
    let count = 0;
    
    // 色を変えるボタンの機能
    colorButton.addEventListener('click', function() {
        // ランダムな色を生成
        const colors = [
            '#e74c3c', // 赤
            '#3498db', // 青
            '#2ecc71', // 緑
            '#f39c12', // オレンジ
            '#9b59b6', // 紫
            '#1abc9c', // ターコイズ
            '#e67e22', // カボチャ
            '#34495e'  // ダークブルー
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorBox.style.backgroundColor = randomColor;
        
        // アニメーション効果
        colorBox.style.transform = 'scale(1.1)';
        setTimeout(() => {
            colorBox.style.transform = 'scale(1)';
        }, 200);
        
        // 成功メッセージ
        showMessage('色が変わりました！', 'success');
    });
    
    // カウントボタンの機能
    countButton.addEventListener('click', function() {
        count++;
        counter.textContent = count;
        
        // カウンターのアニメーション
        counter.style.transform = 'scale(1.2)';
        counter.style.color = '#e74c3c';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
            counter.style.color = '';
        }, 200);
        
        // 10の倍数で特別なメッセージ
        if (count % 10 === 0) {
            showMessage(`${count}回クリックしました！素晴らしい！`, 'special');
        }
    });
    
    // ナビゲーションのスムーズスクロール
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // セクションの表示アニメーション
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // メッセージ表示機能
    function showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.textContent = text;
        message.className = `message message-${type}`;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // メッセージタイプに応じた色
        switch(type) {
            case 'success':
                message.style.backgroundColor = '#2ecc71';
                break;
            case 'special':
                message.style.backgroundColor = '#9b59b6';
                break;
            default:
                message.style.backgroundColor = '#3498db';
        }
        
        document.body.appendChild(message);
        
        // 3秒後にメッセージを削除
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }
    
    // キーボードショートカット
    document.addEventListener('keydown', function(e) {
        // Ctrl + 1: HTMLセクションに移動
        if (e.ctrlKey && e.key === '1') {
            e.preventDefault();
            document.getElementById('html-section').scrollIntoView({ behavior: 'smooth' });
        }
        // Ctrl + 2: CSSセクションに移動
        if (e.ctrlKey && e.key === '2') {
            e.preventDefault();
            document.getElementById('css-section').scrollIntoView({ behavior: 'smooth' });
        }
        // Ctrl + 3: JavaScriptセクションに移動
        if (e.ctrlKey && e.key === '3') {
            e.preventDefault();
            document.getElementById('js-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // ページ読み込み完了メッセージ
    setTimeout(() => {
        showMessage('Webサイトの準備が完了しました！', 'success');
    }, 1000);
});

// CSSアニメーション用のスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 