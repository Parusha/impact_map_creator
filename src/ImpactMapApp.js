import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function ImpactMapDiagram() {
    const [circleText, setCircleText] = useState('Premium Site');
    const [rectangleText, setRectangleText] = useState('');
    const diagramRef = useRef(null);

    const handleDownload = async () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        window.getSelection()?.removeAllRanges();

        if (diagramRef.current) {
            const canvas = await html2canvas(diagramRef.current, { backgroundColor: null });
            const link = document.createElement('a');
            link.download = 'impact-map.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white p-10 font-sans">
            <h1 className="text-4xl font-extrabold mb-10 text-gray-900 select-none">
                Impact Map Diagram Creator
            </h1>

            {/* Inputs */}
            <div className="space-y-6 w-full max-w-xl mb-12">
                <input
                    type="text"
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300 shadow-sm"
                    style={{
                        borderRadius: '10px',
                        padding: '18px 24px',
                        fontSize: '1.125rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                    value={circleText}
                    onChange={(e) => setCircleText(e.target.value)}
                    placeholder="Enter circle text"
                    aria-label="Circle Text Input"
                />
                <input
                    type="text"
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-green-300 transition-shadow duration-300 shadow-sm"
                    style={{
                        borderRadius: '10px',
                        padding: '18px 24px',
                        fontSize: '1.125rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                    value={rectangleText}
                    onChange={(e) => setRectangleText(e.target.value)}
                    placeholder="Enter rectangle text"
                    aria-label="Rectangle Text Input"
                />
            </div>
            <p />

            {/* Diagram */}
            <div
                ref={diagramRef}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg max-w-4xl w-full p-12"
                style={{
                    backgroundColor: '#ffffff',
                    padding: '10px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0,
                    }}
                >
                    {/* Circle */}
                    <div
                        style={{
                            width: 180,
                            height: 180,
                            borderRadius: '50%',
                            border: '3px solid #333',
                            backgroundColor: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#222',
                            fontSize: 16,
                            fontWeight: 600,
                            padding: 20,
                            textAlign: 'center',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            userSelect: 'none',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            marginBottom: -5,
                            zIndex: 1,
                        }}
                    >
                        {circleText || 'Your text here'}
                    </div>

                    {/* Arrow */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: '#111',
                            userSelect: 'none',
                            fontWeight: 'bold',
                            textShadow: '0 1px 1px rgba(0,0,0,0.1)',
                            margin: '5px -8px',
                        }}
                    >
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '10px solid transparent',
                                borderRight: '10px solid transparent',
                                borderBottom: '20px solid #111',
                            }}
                        />
                        <div
                            style={{
                                height: '150px',
                                borderLeft: '4px solid #111',
                            }}
                        />
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '10px solid transparent',
                                borderRight: '10px solid transparent',
                                borderTop: '20px solid #111',
                            }}
                        />
                    </div>

                    {/* Rectangle */}
                    <div
                        style={{
                            minWidth: 180,
                            maxWidth: 350,
                            minHeight: 45,
                            padding: '20px 35px',
                            border: '3px solid #28a745',
                            borderRadius: 14,
                            backgroundColor: '#fff',
                            color: '#111',
                            fontSize: 15,
                            fontWeight: 600,
                            whiteSpace: 'pre-wrap',
                            textAlign: 'center',
                            userSelect: 'none',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            marginTop: -4,
                            overflowWrap: 'break-word',
                        }}
                    >
                        {rectangleText || 'Your text here'}
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="mt-12 px-8 py-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow-lg hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300 active:scale-95"
                aria-label="Download impact map image"
                type="button"
            >
                📥 Download Image
            </button>


            {/* Footer */}
            <footer className="mt-10 text-sm text-gray-600 italic">
                Created by Parusha Naidoo
            </footer>
        </div>
    );
}
