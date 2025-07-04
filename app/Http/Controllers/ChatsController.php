<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Models\Message;
use \App\Models\User;
use \App\Models\Chat;
use \App\Utils\Utils;
use RealRashid\SweetAlert\Facades\Alert;

class ChatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        abort(404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (\App\Utils\Utils::appSettings()->enable_suspension && auth()->user()->isBlocked()) {
            alert()->error("Compte suspendu", "Votre compte a été suspendu")->persistent();
            return redirect()->back();
        }

        abort_unless(\App\Utils\Utils::appSettings()->enable_support, 404);

        if ($request->has("message") && $request->has("content")) {
            $message = Message::where('reference', $request->message)->first();
            if (is_null($message)) {
                alert()->error("Introuvable", "Conversation introuvable")->persistent();
                return redirect()->back();
            }
            if (is_null($request->content)) {
                alert()->error("Vide", "Le contenu du message est vide")->persistent();
                return redirect()->back();
            }

            if (is_null($message->user)) {
                alert()->error("Introuvable", "Initiateur introuvable")->persistent();
                return redirect()->back();
            }

            if (is_null($message->user->isBlocked())) {
                alert()->error("Compte suspendu", "Le compte de ".$message->user->name." a été suspendu")->persistent();
                return redirect()->back();
            }

            abort_unless($message->user->id == auth()->user()->id || auth()->user()->isPartOfAdmin(), 403);

            $chat = Chat::create([
                'reference' => Utils::generateReference(Chat::all(), Utils::fakeToken(20), 1),
                'user_id' => auth()->user()->id,
                'message_id' => $message->id,
                'content' => $request->content,
                'image_url' => null,
                'is_sent' => 1,
                'is_read' => 0,
                'sent_at' => now(),
                'read_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            # Storing image
            # Checking if image has been uploaded
            if ($request->hasFile('image')) {
                # Checking image mime type
                if (in_array($request->file('image')->getMimeType(), Utils::getAllowedImagesMimeTypes())) {
                    # Generating filename for image
                    $tempFilename = 'IMG-'.$chat->reference.'.'.$request->file('image')->getClientOriginalExtension();                        
                    # Moving uploaded image to local storage
                    $request->file('image')->move(public_path('uploads/'), $tempFilename);
                    # Binding uploaded image with db record
                    $chat->image_url = 'uploads/'.$tempFilename;
                    $chat->save();           
                }
            }

            toast("Message envoyé avec succès", "success");
            return redirect()->route("app.support.details", $message->reference);

        } else {
            alert()->error("Erreur", "Impossible de soumettre votre message.\n Veuillez contacter les administrateurs si cela persiste.")->persistent();
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        abort(404);
    }
}
