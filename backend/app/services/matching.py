def match_volunteers(request, volunteers):
    results = []

    request_skill = (request.required_skills or "").strip().lower()

    for v in volunteers:
        volunteer_skill = (v.skills or "").strip().lower()

        score = 0

        if request_skill in volunteer_skill:
            score += 50

        if v.availability:
            score += 20

        if score > 0:
            results.append({
                "volunteer": {
                    "id": v.id,
                    "name": v.name,
                    "skills": v.skills,
                    "district": v.district,
                    "state": v.state,
                    "transport": v.transport
                },
                "score": score
            })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results