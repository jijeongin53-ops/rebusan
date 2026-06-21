const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

/**
 * 구글 앱스 스크립트 웹 앱을 통해 데이터를 시트에 추가합니다.
 * @param {string} sheetName - 저장할 시트 이름 (예: "Results")
 * @param {Object} payload - 저장할 데이터 객체
 */
export const appendToSheet = async (sheetName, payload) => {
    if (!SCRIPT_URL) {
        console.warn('VITE_GOOGLE_SHEETS_URL is not set in environment variables. Data will not be saved.');
        return { success: false, error: 'No Script URL' };
    }

    try {
        await fetch(`${SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}&action=append`, {
            method: 'POST',
            mode: 'no-cors', // CORS 이슈 방지를 위해 no-cors 사용
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', 
            },
            body: JSON.stringify(payload),
        });
        
        // no-cors 모드에서는 항상 불투명(opaque) 응답을 받으므로 오류 체크 불가
        return { success: true };
    } catch (error) {
        console.error('Error appending to sheet:', error);
        return { success: false, error };
    }
};
