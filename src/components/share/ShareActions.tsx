import React, { useState } from 'react';
import { SHARE_META, getShareUrl } from '../../config/shareMeta';
import { shareToKakao, isKakaoAvailable } from '../../lib/kakao';
import styles from './ShareActions.module.css';

interface ShareActionsProps {
    title?: string;
    text?: string;
    url?: string;
}

export const ShareActions: React.FC<ShareActionsProps> = ({
    title = SHARE_META.TITLE,
    text = SHARE_META.DESCRIPTION,
    url = getShareUrl()
}) => {
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    handleCopyLink();
                }
            }
        } else {
            handleCopyLink();
        }
    };

    const handleKakaoShare = () => {
        shareToKakao({
            title,
            description: text,
            imageUrl: SHARE_META.IMAGE_URL,
            url
        });
    };

    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                showToast('Link Copied');
            } else {
                // Fallback for non-supported clipboard
                const textArea = document.createElement("textarea");
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('Link Copied');
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    const showToast = (msg: string) => {
        setCopyStatus(msg);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    return (
        <div className={styles.shareContainer}>
            <div className={styles.buttonGroup}>
                {!!navigator.share ? (
                    <button
                        className={styles.shareBtn}
                        onClick={handleWebShare}
                        aria-label="Share via native device"
                    >
                        Share
                    </button>
                ) : (
                    <button
                        className={styles.shareBtn}
                        onClick={handleCopyLink}
                        aria-label="Copy link to clipboard"
                    >
                        Copy Link
                    </button>
                )}

                <button
                    className={`${styles.shareBtn} ${styles.kakaoBtn}`}
                    onClick={handleKakaoShare}
                    disabled={!isKakaoAvailable()}
                    aria-label="Share via KakaoTalk"
                >
                    Kakao
                </button>
            </div>

            {copyStatus && (
                <div className={styles.toast} role="status">
                    {copyStatus}
                </div>
            )}
        </div>
    );
};
