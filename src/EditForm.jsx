import React, { useState } from 'react';

export const EditEntryType = {
    PillList: 'PillList',
};

export function EditForm({ title, description, editEntries, entityObj, onSubmitSuccess }) {
    const [entity, setEntity] = useState({ ...entityObj });

    return (
        <form
            className="p-4 space-y-6"
            onSubmit={(e) => {
                e.preventDefault();
                const copy = { ...entity };
                delete copy.__pillInput;
                console.log('Form submitted with:', copy);
                onSubmitSuccess(copy);
            }}
        >
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>

            {editEntries.map((editEntry, index) => {
                if (editEntry.type === EditEntryType.PillList) {
                    return (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {editEntry.attributeName}
                            </label>
                            <div className="border border-gray-300 p-2 rounded-md bg-white min-h-[3rem] flex flex-wrap gap-2">
                                {(entity[editEntry.attribute] || []).map((item, i) => (
                                    <div key={i} className="flex items-center border border-black text-sm px-2 py-1 rounded-full bg-white">
                                        {item}
                                        <button
                                            type="button"
                                            className="ml-2 text-gray-500 hover:text-red-600"
                                            onClick={() => {
                                                const updated = [...entity[editEntry.attribute]];
                                                updated.splice(i, 1);
                                                setEntity({ ...entity, [editEntry.attribute]: updated });
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={entity.__pillInput || ''}
                                    onChange={(e) =>
                                        setEntity({ ...entity, __pillInput: e.target.value })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && entity.__pillInput?.trim()) {
                                            e.preventDefault();
                                            const currentList = entity[editEntry.attribute] || [];
                                            const newValue = entity.__pillInput.trim();
                                            if (!currentList.includes(newValue)) {
                                                setEntity({
                                                    ...entity,
                                                    [editEntry.attribute]: [...currentList, newValue],
                                                    __pillInput: '',
                                                });
                                            }
                                        }
                                    }}
                                    placeholder="Type and press Enter to add"
                                />
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                Submit
            </button>
        </form>
    );
}