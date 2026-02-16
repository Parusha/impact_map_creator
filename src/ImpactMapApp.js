import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

const DEFAULT_CIRCLE_LABELS = [
    'Premium Site',
    'Lucky Fish',
    'Mozambique Site',
];

export default function ImpactMapDiagram() {
    const [circles, setCircles] = useState(DEFAULT_CIRCLE_LABELS);
    const [rectangleText, setRectangleText] = useState('');
    const diagramRef = useRef(null);
    const rectangleRef = useRef(null);

    const dynamicWidth = Math.max(220, circles.length * 220);

    /* ---------------- AUTO GROW TEXTAREA ---------------- */
    const autoResizeTextarea = () => {
        const textarea = rectangleRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight-50 + 'px';
        }
    };

    useEffect(() => {
        autoResizeTextarea();
    }, [rectangleText]);

    const handleRectangleChange = (e) => {
        setRectangleText(e.target.value);
    };

    /* ---------------- CIRCLE HANDLERS ---------------- */

    const handleAddCircle = () => {
        if (circles.length >= 10) return;

        if (circles.length < DEFAULT_CIRCLE_LABELS.length) {
            setCircles((prev) => [
                ...prev,
                DEFAULT_CIRCLE_LABELS[prev.length],
            ]);
        } else {
            setCircles((prev) => [
                ...prev,
                `Circle ${prev.length + 1}`,
            ]);
        }
    };

    const handleRemoveCircle = (index) => {
        if (circles.length === 1) return;
        setCircles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCircleChange = (index, value) => {
        setCircles((prev) =>
            prev.map((circle, i) => (i === index ? value : circle))
        );
    };

    /* ---------------- DOWNLOAD ---------------- */

    const handleDownload = async () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        window.getSelection()?.removeAllRanges();

        // Allow DOM to repaint before capture
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (diagramRef.current) {
            const canvas = await html2canvas(diagramRef.current, {
                backgroundColor: '#ffffff',
                scale: 2, // improves clarity
                useCORS: true,
            });

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

            {/* Circle Inputs */}
            <div className="space-y-4 w-full max-w-xl mb-8">
                {circles.map((text, index) => (
                    <div key={index} className="flex gap-3 items-center">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) =>
                                handleCircleChange(index, e.target.value)
                            }
                            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm text-black"
                            placeholder={`Circle ${index + 1} text`}
                        />
                        <button
                            onClick={() => handleRemoveCircle(index)}
                            disabled={circles.length === 1}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-40"
                            type="button"
                        >
                            −
                        </button>
                    </div>
                ))}
            </div>


            {/* Add Circle Button */}
            <button
                onClick={handleAddCircle}
                disabled={circles.length >= 10}
                className="mb-10 px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition disabled:opacity-50"
                type="button"
            >
                + Add Item
            </button>

            {/* Diagram Outer Border */}
            <div
                ref={diagramRef}
                style={{ minWidth: dynamicWidth + 80 }}
                className="rounded-2xl border-4 border-gray-400 shadow-xl p-4"
            >
                {/* White Inner Area */}
                <div
                    className="bg-white rounded-xl p-10"
                    style={{
                        backgroundColor: "white",
                        marginTop: "10px",
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Circles + Arrows */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: 40,
                        }}
                    >
                        {circles.map((text, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
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
                                        fontWeight: 600,
                                        padding: 20,
                                        textAlign: 'center',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        boxShadow:
                                            '0 4px 8px rgba(0,0,0,0.1)',
                                        color: '#000',
                                    }}
                                >
                                    {text || 'Your text here'}
                                </div>

                                {/* Arrows */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: 1,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 0,
                                            height: 0,
                                            borderLeft:
                                                '10px solid transparent',
                                            borderRight:
                                                '10px solid transparent',
                                            borderBottom:
                                                '20px solid #111',
                                        }}
                                    />
                                    <div
                                        style={{
                                            height: '120px',
                                            borderLeft: '4px solid #111',
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 0,
                                            height: 0,
                                            borderLeft:
                                                '10px solid transparent',
                                            borderRight:
                                                '10px solid transparent',
                                            borderTop:
                                                '20px solid #111',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Auto-Growing Rectangle */}
                    <div
                        style={{
                            marginTop: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <textarea
                            ref={rectangleRef}
                            value={rectangleText}
                            onChange={handleRectangleChange}
                            placeholder="Your text here"
                            rows={1}
                            style={{
                                minWidth: 220,
                                width: dynamicWidth,
                                minHeight: 10,
                                padding: '20px 35px',
                                border: '3px solid #28a745',
                                borderRadius: 14,
                                backgroundColor: '#fff',
                                textAlign: 'center',
                                fontWeight: 600,
                                fontSize:"15px",
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                color: '#000',
                                resize: 'none',
                                overflow: 'hidden',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="mt-12 px-8 py-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow-lg hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 ease-in-out active:scale-95"
                type="button"
            >
                📥 Download Image
            </button>

            <footer className="mt-10 text-sm text-gray-600 italic">
                Created by Parusha Naidoo
            </footer>
        </div>
    );
}
